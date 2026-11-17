import { build } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function main() {
  // 1. Ensure root /assets/ and root SEO files mirror public/ for direct zero-build uploads
  copyDirRecursive(path.join(rootDir, 'public', 'assets'), path.join(rootDir, 'assets'));
  for (const rootFile of ['robots.txt', 'sitemap.xml']) {
    const srcFile = path.join(rootDir, 'public', rootFile);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, path.join(rootDir, rootFile));
    }
  }

  // 2. Build unhashed, browser-ready CSS + IIFE JS bundle directly into /assets/
  await build({
    root: rootDir,
    configFile: false,
    publicDir: false,
    plugins: [tailwindcss()],
    build: {
      outDir: path.join(rootDir, 'assets'),
      emptyOutDir: false,
      minify: true,
      cssCodeSplit: false,
      lib: {
        entry: path.join(rootDir, 'src', 'bundle-entry.ts'),
        name: 'SonnenpfadSite',
        formats: ['iife'],
        fileName: () => 'site-bundle.js',
        cssFileName: 'site-bundle',
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'site-bundle.css';
            }
            return 'bundle-[name][extname]';
          },
        },
      },
    },
  });

  // Fallback check if Vite emitted style.css instead of site-bundle.css
  const fallbackCss = path.join(rootDir, 'assets', 'style.css');
  const targetCss = path.join(rootDir, 'assets', 'site-bundle.css');
  if (fs.existsSync(fallbackCss) && !fs.existsSync(targetCss)) {
    fs.renameSync(fallbackCss, targetCss);
  } else if (fs.existsSync(fallbackCss) && fs.existsSync(targetCss)) {
    fs.rmSync(fallbackCss);
  }

  // 3. Mirror compiled bundles into public/assets/ so Vite dev server & vite build include them
  const publicAssetsDir = path.join(rootDir, 'public', 'assets');
  fs.mkdirSync(publicAssetsDir, { recursive: true });
  for (const bundleFile of ['site-bundle.css', 'site-bundle.js']) {
    const compiled = path.join(rootDir, 'assets', bundleFile);
    if (fs.existsSync(compiled)) {
      fs.copyFileSync(compiled, path.join(publicAssetsDir, bundleFile));
    }
  }

  console.log('[Sonnenpfad] Static bundles ready: assets/site-bundle.css & assets/site-bundle.js');
}

main().catch((err) => {
  console.error('[Sonnenpfad] Static bundle build failed:', err);
  process.exit(1);
});
