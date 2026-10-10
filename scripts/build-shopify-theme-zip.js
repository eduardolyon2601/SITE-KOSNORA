import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { ZipArchive } = require('archiver');

const rootDir = process.cwd();
const outputDirs = [
  path.join(rootDir, 'public', 'kosnora-shopify-theme.zip'),
  path.join(rootDir, 'kosnora-shopify-theme.zip')
];

// Ensure public directory exists
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Shopify theme folders to bundle into the root of the ZIP
const themeFolders = [
  'layout',
  'templates',
  'sections',
  'snippets',
  'assets',
  'config',
  'locales'
];

async function createZip(outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = new ZipArchive({
      zlib: { level: 9 }
    });

    output.on('close', () => {
      console.log(`[ZIP SUCCESS] Created ${outputPath} (${archive.pointer ? archive.pointer() : 'done'} bytes)`);
      resolve();
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Add each theme folder
    for (const folder of themeFolders) {
      const folderPath = path.join(rootDir, folder);
      if (fs.existsSync(folderPath)) {
        archive.directory(folderPath, folder);
        console.log(`[ZIP] Added folder: ${folder}/`);
      } else {
        console.warn(`[ZIP WARNING] Folder not found: ${folder}/`);
      }
    }

    archive.finalize();
  });
}

async function run() {
  console.log('[KOSNORA] Packaging Shopify Online Store 2.0 theme ZIP...');
  for (const outPath of outputDirs) {
    await createZip(outPath);
  }
  console.log('[KOSNORA] Theme packaging complete!');
}

run().catch((err) => {
  console.error('[ZIP ERROR]', err);
  process.exit(1);
});
