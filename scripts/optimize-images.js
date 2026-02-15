/**
 * Resize large images for faster load while keeping high quality.
 * Uses sharp for precise control (install with: npm install --save-dev sharp).
 *
 * Run: node scripts/optimize-images.js
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function run() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('sharp is required. Run: npm install --save-dev sharp');
    process.exit(1);
  }

  const tasks = [
    {
      path: join(root, 'public/icon-512.png'),
      maxSize: 512,
      format: 'png',
      options: { compressionLevel: 6 },
      desc: 'App icon 2048→512',
    },
    {
      path: join(root, 'uploaded_images/image1.jpg'),
      maxSize: 1200,
      format: 'jpeg',
      options: { quality: 90 },
      desc: 'Splash background',
    },
  ];

  for (const task of tasks) {
    if (!existsSync(task.path)) {
      console.warn('Skip (not found):', task.path);
      continue;
    }
    const buf = readFileSync(task.path);
    const meta = await sharp(buf).metadata();
    const w = meta.width || 0;
    const h = meta.height || 0;
    if (w <= task.maxSize && h <= task.maxSize) {
      console.log('Already small enough:', task.desc);
      continue;
    }
    let pipeline = sharp(buf)
      .resize(task.maxSize, task.maxSize, { fit: 'inside', withoutEnlargement: true });
    if (task.format === 'png') {
      pipeline = pipeline.png(task.options);
    } else {
      pipeline = pipeline.jpeg(task.options);
    }
    const resized = await pipeline.toBuffer();
    const outMeta = await sharp(resized).metadata();
    writeFileSync(task.path, resized);
    console.log('Resized:', task.desc, `${w}x${h} → ${outMeta.width}x${outMeta.height}`, task.path);
  }
  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
