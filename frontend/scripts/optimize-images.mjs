#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ImageConverter } from 'wasm-image-optimization';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirname, '..');
const imageRoot = path.join(projectRoot, 'public', 'images');
// Le immagini originali committate vivono qui; generated è derivata e ignorata da Git.
const originRoot = path.join(imageRoot, 'origin');
const outputRoot = path.join(imageRoot, 'generated');

const sourceExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
// Keep this list in sync with ResponsiveImage: the component builds srcset URLs from it.
const widths = [320, 480, 768, 1024, 1440, 1920];
const quality = 82;
const speed = 6;
const force = process.argv.includes('--force');

async function main() {
  // Partiamo solo da origin: così non rielaboriamo generated e non creiamo cartelle duplicate.
  const sources = await collectSourceImages(originRoot);

  if (force) {
    await fs.rm(outputRoot, { recursive: true, force: true });
  }

  await fs.mkdir(outputRoot, { recursive: true });

  const converter = await ImageConverter.create();
  let generatedCount = 0;
  let skippedCount = 0;

  for (const sourcePath of sources) {
    const sourceRelative = toPosix(path.relative(originRoot, sourcePath));
    const image = await fs.readFile(sourcePath);
    // A metadata-only pass gives us the original ratio before writing every variant.
    const probe = await converter.optimizeImage({ image, format: 'none' });
    const originalWidth = probe.originalWidth || probe.width;
    const originalHeight = probe.originalHeight || probe.height;

    if (!originalWidth || !originalHeight) {
      console.warn(`Skipping ${sourceRelative}: missing image dimensions.`);
      skippedCount += 1;
      continue;
    }

    const sourceStats = await fs.stat(sourcePath);

    for (const width of widths) {
      const outputRelative = getOutputRelativePath(sourceRelative, width);
      const outputPath = path.join(imageRoot, outputRelative);

      // Normal runs only refresh stale variants; --force rebuilds the whole folder.
      if (!force && !(await shouldRegenerate(sourceStats, outputPath))) {
        skippedCount += 1;
        continue;
      }

      const height = Math.round((originalHeight / originalWidth) * width);
      // Height is calculated from the original ratio, so fill does not distort the image.
      const result = await converter.optimizeImage({
        image,
        width,
        height,
        fit: 'fill',
        format: 'webp',
        quality,
        speed,
        animation: probe.originalAnimation,
      });

      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, result.data);

      generatedCount += 1;
    }
  }

  console.log(`Generated ${generatedCount} WebP files. Skipped ${skippedCount} up-to-date files.`);
}

function getOutputRelativePath(sourceRelative, width) {
  const directory = path.posix.dirname(sourceRelative);
  const filename = path.posix.basename(sourceRelative, path.posix.extname(sourceRelative));
  // Example: regions/toscana.jpg -> generated/regions/toscana-768w.webp
  const outputFilename = `${filename}-${width}w.webp`;

  return directory === '.'
    ? path.posix.join('generated', outputFilename)
    : path.posix.join('generated', directory, outputFilename);
}

async function shouldRegenerate(sourceStats, outputPath) {
  try {
    const outputStats = await fs.stat(outputPath);

    return outputStats.mtimeMs < sourceStats.mtimeMs;
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return true;
    }

    throw error;
  }
}

async function collectSourceImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectSourceImages(absolutePath)));

      continue;
    }

    if (entry.isFile() && sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files.sort((first, second) => first.localeCompare(second));
}

function toPosix(filePath) {
  return filePath.split(path.sep).join(path.posix.sep);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
