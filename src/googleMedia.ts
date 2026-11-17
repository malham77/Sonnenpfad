/**
 * Sonnenpfad Safaris Uganda Ltd - Direct Google Workspace / Drive Image Uploader
 * Client-side Firebase Auth + OAuth token management (in-memory token cache only).
 * Automatically uploads dashboard images (Safaris, Shop, TikTok thumbnails)
 * into the verified Google account (default hint: maleham06@gmail.com).
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { supabase } from './supabase';

export const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
];

export const DEFAULT_WORKSPACE_EMAIL = 'maleham06@gmail.com';
const WORKSPACE_EMAIL_PREF_KEY = 'sonnenpfad_workspace_email';
const WORKSPACE_SETTINGS_ROW_ID = 'workspace_config';
const MEDIA_FOLDER_NAME = 'Sonnenpfad Safaris Media';

const app: FirebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let currentUser: User | null = null;

export interface GoogleMediaFile {
  id: string;
  name: string;
  mimeType: string;
  mediaType: 'image' | 'video';
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  displayUrl: string;
  embedUrl?: string;
  createdTime?: string;
  sizeBytes?: number;
}

export function getPreferredWorkspaceEmail(): string {
  try {
    const saved = localStorage.getItem(WORKSPACE_EMAIL_PREF_KEY);
    if (saved && saved.includes('@')) return saved.trim();
  } catch {}
  return DEFAULT_WORKSPACE_EMAIL;
}

export function setPreferredWorkspaceEmail(email: string): string {
  const clean = String(email || '').trim() || DEFAULT_WORKSPACE_EMAIL;
  try {
    localStorage.setItem(WORKSPACE_EMAIL_PREF_KEY, clean);
  } catch {}
  return clean;
}

export async function fetchPreferredWorkspaceEmail(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('email')
      .eq('id', WORKSPACE_SETTINGS_ROW_ID)
      .maybeSingle();

    if (!error && data && data.email && String(data.email).includes('@')) {
      return setPreferredWorkspaceEmail(String(data.email));
    }
  } catch {}
  return getPreferredWorkspaceEmail();
}

export async function savePreferredWorkspaceEmail(
  email: string
): Promise<{ email: string; cloudSynced: boolean; error?: string }> {
  const clean = setPreferredWorkspaceEmail(email);
  try {
    const { error } = await supabase.from('settings').upsert({
      id: WORKSPACE_SETTINGS_ROW_ID,
      email: clean,
      updated_at: new Date().toISOString(),
    });
    if (!error) {
      return { email: clean, cloudSynced: true };
    }
    return { email: clean, cloudSynced: false, error: error.message };
  } catch (err: any) {
    return { email: clean, cloudSynced: false, error: err?.message || 'Cloud sync error' };
  }
}

function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  let match = url.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && url.includes('drive.google.com')) return match[1];
  return null;
}

export function handleMediaImgError(
  imgEl: HTMLImageElement | null,
  fallbackSrc = './assets/images/hero-savannah.jpg'
): void {
  if (!imgEl) return;
  const currentSrc = imgEl.getAttribute('src') || '';
  const step = imgEl.dataset.fallbackStep || '0';
  const driveId = extractDriveFileId(currentSrc);

  if (driveId && step === '0') {
    imgEl.dataset.fallbackStep = '1';
    imgEl.referrerPolicy = 'no-referrer';
    imgEl.src = `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w1600`;
    return;
  }

  if (driveId && step === '1') {
    imgEl.dataset.fallbackStep = '2';
    imgEl.referrerPolicy = 'no-referrer';
    imgEl.src = `https://drive.google.com/uc?export=view&id=${encodeURIComponent(driveId)}`;
    return;
  }

  if (step !== 'done' && currentSrc !== fallbackSrc) {
    imgEl.dataset.fallbackStep = 'done';
    imgEl.src = fallbackSrc;
  }
}

export function buildPermanentGoogleUrls(fileId: string, mimeType: string, fallbackThumb?: string) {
  const isVideo = mimeType.startsWith('video/');
  if (isVideo) {
    return {
      displayUrl: `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`,
      embedUrl: `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`,
      thumbnailUrl: fallbackThumb || `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1200`,
    };
  }
  return {
    displayUrl: `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}=w1600`,
    embedUrl: `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`,
    thumbnailUrl: fallbackThumb || `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1200`,
  };
}

export function initGoogleAuth(
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: (user: User | null) => void
) {
  return onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!isSigningIn) {
      if (!user) cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure(user);
    }
  });
}

export async function googleSignIn(preferredEmail?: string): Promise<{ user: User; accessToken: string }> {
  try {
    isSigningIn = true;
    const provider = new GoogleAuthProvider();
    SCOPES.forEach((scope) => provider.addScope(scope));

    const hintEmail = (preferredEmail || getPreferredWorkspaceEmail()).trim();
    provider.setCustomParameters({
      prompt: 'select_account',
      ...(hintEmail ? { login_hint: hintEmail } : {}),
    });

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Could not obtain Google access token. Please try signing in again.');
    }

    cachedAccessToken = credential.accessToken;
    currentUser = result.user;
    if (result.user.email) {
      await savePreferredWorkspaceEmail(result.user.email);
    }
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
}

export async function googleSignOut(): Promise<void> {
  cachedAccessToken = null;
  currentUser = null;
  await auth.signOut();
}

export function getGoogleAccessToken(): string | null {
  return cachedAccessToken;
}

export function getCurrentGoogleUser(): User | null {
  return currentUser;
}

async function ensureMediaFolder(accessToken: string): Promise<string> {
  const q = encodeURIComponent(
    `name = '${MEDIA_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
  );
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)&pageSize=1`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      return searchData.files[0].id;
    }
  }

  const createRes = await fetch('https://www.googleapis.com/drive/v3/files?fields=id', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: MEDIA_FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });
  if (!createRes.ok) {
    throw new Error('Unable to prepare Google Drive media folder.');
  }
  const created = await createRes.json();
  return created.id;
}

export async function makeDriveFilePublic(accessToken: string, fileId: string): Promise<void> {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}/permissions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: 'reader',
      type: 'anyone',
    }),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error('Permission update failed: ' + (msg || res.status));
  }
}

export async function uploadFileToGoogleMedia(
  file: File,
  title: string,
  onProgress?: (percent: number) => void
): Promise<GoogleMediaFile> {
  const accessToken = cachedAccessToken;
  if (!accessToken) {
    throw new Error('Please verify your Google Workspace account first.');
  }

  if (onProgress) onProgress(10);
  const folderId = await ensureMediaFolder(accessToken);
  if (onProgress) onProgress(25);

  const mimeType = file.type || (file.name.match(/\.(mp4|mov|webm|m4v|avi)$/i) ? 'video/mp4' : 'image/jpeg');
  const metadata = {
    name: title ? `${title}${getFileExtension(file.name)}` : file.name,
    parents: [folderId],
    description: 'Uploaded from Sonnenpfad Safaris Uganda Ltd Owner Dashboard',
  };

  const initRes = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,mimeType,thumbnailLink,webViewLink,webContentLink,createdTime,size',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Type': mimeType,
        'X-Upload-Content-Length': String(file.size),
      },
      body: JSON.stringify(metadata),
    }
  );

  if (!initRes.ok) {
    const errText = await initRes.text().catch(() => '');
    throw new Error('Failed to start Google upload session: ' + (errText || initRes.status));
  }

  const uploadUrl = initRes.headers.get('Location');
  if (!uploadUrl) {
    throw new Error('Google upload session URL was not returned.');
  }

  if (onProgress) onProgress(35);

  const uploadedData: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);
    xhr.setRequestHeader('Content-Type', mimeType);
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable && onProgress) {
        const pct = Math.min(92, 35 + Math.round((ev.loaded / ev.total) * 57));
        onProgress(pct);
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error('Invalid response after file upload.'));
        }
      } else {
        reject(new Error(`Google upload returned HTTP ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error during upload to Google Drive.'));
    xhr.send(file);
  });

  await makeDriveFilePublic(accessToken, uploadedData.id);
  if (onProgress) onProgress(100);

  const mediaType: 'image' | 'video' = mimeType.startsWith('video/') ? 'video' : 'image';
  const urls = buildPermanentGoogleUrls(uploadedData.id, mimeType, uploadedData.thumbnailLink);

  return {
    id: uploadedData.id,
    name: uploadedData.name || metadata.name,
    mimeType: uploadedData.mimeType || mimeType,
    mediaType,
    thumbnailLink: urls.thumbnailUrl,
    webViewLink: uploadedData.webViewLink,
    webContentLink: uploadedData.webContentLink,
    displayUrl: urls.displayUrl,
    embedUrl: urls.embedUrl,
    createdTime: uploadedData.createdTime,
    sizeBytes: Number(uploadedData.size || file.size),
  };
}

export async function deleteGoogleDriveFile(fileId: string): Promise<void> {
  const accessToken = cachedAccessToken;
  if (!accessToken) {
    throw new Error('Sign in with Google to remove files from Google Drive.');
  }
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(`Failed to delete file from Google Drive (${res.status}).`);
  }
}

function getFileExtension(name: string): string {
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx) : '';
}
