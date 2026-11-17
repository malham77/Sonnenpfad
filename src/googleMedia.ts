/**
 * Sonnenpfad Safaris Uganda Ltd - Google Drive & Google Photos Media Connector
 * Client-side Firebase Auth + OAuth token management (in-memory cache only)
 * Supports separated Image & Video uploads, public web sharing, and Google Photos browsing.
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

export const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
];

const MEDIA_FOLDER_NAME = 'Sonnenpfad Safaris Media';

const app: FirebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

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

export async function googleSignIn(): Promise<{ user: User; accessToken: string }> {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Could not obtain Google access token. Please try signing in again.');
    }
    cachedAccessToken = credential.accessToken;
    currentUser = result.user;
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
    throw new Error('Please sign in with Google first before uploading.');
  }

  if (onProgress) onProgress(10);
  const folderId = await ensureMediaFolder(accessToken);
  if (onProgress) onProgress(22);

  const mimeType = file.type || (file.name.match(/\.(mp4|mov|webm|m4v|avi)$/i) ? 'video/mp4' : 'image/jpeg');
  const metadata = {
    name: title ? `${title}${getFileExtension(file.name)}` : file.name,
    parents: [folderId],
    description: 'Uploaded from Sonnenpfad Safaris Uganda Ltd Website Media Studio',
  };

  // Start resumable upload session so both photos and large HD safari videos upload reliably
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
    xhr.onerror = () => reject(new Error('Network error during file upload to Google.'));
    xhr.send(file);
  });

  // Ensure anyone visiting the public website can view this uploaded image or video
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

export async function listGooglePhotosAndMedia(): Promise<{
  images: GoogleMediaFile[];
  videos: GoogleMediaFile[];
}> {
  const accessToken = cachedAccessToken;
  if (!accessToken) {
    throw new Error('Please sign in with Google first.');
  }

  const query = encodeURIComponent(
    "(mimeType contains 'image/' or mimeType contains 'video/') and trashed = false"
  );
  const fields = encodeURIComponent(
    'files(id,name,mimeType,thumbnailLink,webViewLink,webContentLink,createdTime,size)'
  );

  // Query both Drive and Google Photos spaces authorized by scopes
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?spaces=drive,photos&q=${query}&orderBy=createdTime desc&pageSize=40&fields=${fields}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    // Fallback to drive space if photos space is empty/disabled on this account
    const fallbackRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime desc&pageSize=40&fields=${fields}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!fallbackRes.ok) {
      throw new Error(`Could not list Google media (${fallbackRes.status}).`);
    }
    const fbData = await fallbackRes.json();
    return splitMediaFiles(fbData.files || []);
  }

  const data = await res.json();
  return splitMediaFiles(data.files || []);
}

function splitMediaFiles(rawFiles: any[]): {
  images: GoogleMediaFile[];
  videos: GoogleMediaFile[];
} {
  const images: GoogleMediaFile[] = [];
  const videos: GoogleMediaFile[] = [];

  for (const f of rawFiles) {
    const mime = String(f.mimeType || '');
    const mediaType: 'image' | 'video' = mime.startsWith('video/') ? 'video' : 'image';
    const urls = buildPermanentGoogleUrls(f.id, mime, f.thumbnailLink);
    const mapped: GoogleMediaFile = {
      id: f.id,
      name: f.name || 'Untitled Media',
      mimeType: mime,
      mediaType,
      thumbnailLink: urls.thumbnailUrl,
      webViewLink: f.webViewLink,
      webContentLink: f.webContentLink,
      displayUrl: urls.displayUrl,
      embedUrl: urls.embedUrl,
      createdTime: f.createdTime,
      sizeBytes: Number(f.size || 0),
    };
    if (mediaType === 'video') videos.push(mapped);
    else images.push(mapped);
  }

  return { images, videos };
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

export async function openGoogleMediaPicker(): Promise<GoogleMediaFile | null> {
  const accessToken = cachedAccessToken;
  if (!accessToken) {
    throw new Error('Sign in with Google first.');
  }

  await loadGooglePickerScript();

  const pickerOrigin =
    window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
      ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
      : window.location.origin;

  return new Promise((resolve) => {
    const gapiObj = (window as any).gapi;
    if (!gapiObj) {
      resolve(null);
      return;
    }
    gapiObj.load('picker', () => {
      const googlePicker = (window as any).google?.picker;
      if (!googlePicker) {
        resolve(null);
        return;
      }

      const docsView = new googlePicker.DocsView(googlePicker.ViewId.DOCS_IMAGES_AND_VIDEOS)
        .setIncludeFolders(true)
        .setSelectFolderEnabled(false);

      const picker = new googlePicker.PickerBuilder()
        .addView(docsView)
        .setOAuthToken(accessToken)
        .setOrigin(pickerOrigin)
        .setCallback((data: any) => {
          if (data.action === googlePicker.Action.PICKED && data.docs?.length) {
            const doc = data.docs[0];
            const mime = String(doc.mimeType || 'image/jpeg');
            const mediaType: 'image' | 'video' = mime.startsWith('video/') ? 'video' : 'image';
            const urls = buildPermanentGoogleUrls(doc.id, mime);
            resolve({
              id: doc.id,
              name: doc.name || 'Selected Google Media',
              mimeType: mime,
              mediaType,
              thumbnailLink: urls.thumbnailUrl,
              webViewLink: doc.url,
              displayUrl: urls.displayUrl,
              embedUrl: urls.embedUrl,
            });
          } else if (data.action === googlePicker.Action.CANCEL) {
            resolve(null);
          }
        })
        .build();
      picker.setVisible(true);
    });
  });
}

function loadGooglePickerScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).gapi?.load) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load Google Picker script.'));
    document.head.appendChild(script);
  });
}

function getFileExtension(name: string): string {
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx) : '';
}
