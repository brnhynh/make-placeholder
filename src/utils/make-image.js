import { parse, join } from 'node:path';
import { createWriteStream } from 'node:fs';

import { createCanvas } from 'canvas';

/**
 * Generates a placeholder image.
 * @param {number} width - The width of the canvas (in pixels).
 * @param {number} height - The height of the canvas (in pixels).
 * @param {object} options - Configuration options for image generation.
 * @param {string} options.background - Background color for the image.
 * @param {string} options.textColor - Text color for the image.
 * @param {string} options.text - Text to display on the image.
 * @param {string} options.fontSize - Font size for the text.
 * @param {string} options.fontFamily - Font family for the text.
 * @param {string} options.outputPath - Output path for the image.
 */
export async function makeImage(width, height, options) {
  try {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.imageSmoothingQuality = 'high';
    context.quality = 'best';
    context.antialias = 'default';

    context.fillStyle = options.background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = options.textColor;

    const fontSizeValue =
      options.fontSize.toLowerCase() === 'auto'
        ? `${Math.min(canvas.width, canvas.height) / 7}px`
        : options.fontSize;

    context.font = `${fontSizeValue} ${options.fontFamily}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const defaultOutputName = `${canvas.width}x${canvas.height}`;
    let outputDirectory = '';
    let outputName = defaultOutputName;
    let outputFormat = '.jpeg';

    if (options.outputPath) {
      const { dir, name, ext } = parse(options.outputPath);
      outputDirectory = dir;
      outputFormat = ext;

      if (ext !== '.jpeg' && ext !== '.png') {
        throw new Error('Invalid file path or extension (only .jpeg or .png)');
      }

      // Use the name from outputPath instead of the defaultOutputName
      if (name.length !== 0) {
        outputName = name;
      }
    }

    context.fillText(
      options.text || defaultOutputName,
      Math.round(canvas.width / 2),
      Math.round(canvas.height / 2)
    );

    const outputFullFilePath = join(outputDirectory, outputName + outputFormat);

    const output = createWriteStream(outputFullFilePath);

    const stream =
      outputFormat === '.jpeg'
        ? canvas.createJPEGStream({ quality: 0.9 })
        : canvas.createPNGStream();

    await new Promise((resolve, reject) => {
      stream.pipe(output);
      output.on('finish', () => {
        console.log(`Image saved as ${outputFullFilePath}`);
        resolve();
      });

      output.on('error', (err) => {
        console.error(`Error: Unable to save the image. ${err.message}`);
        reject(err);
      });
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
