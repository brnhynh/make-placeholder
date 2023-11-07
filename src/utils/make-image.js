import { parse, join } from 'node:path';

import Jimp from 'jimp';

/**
 * Generates a placeholder image.
 * @param {number} width - The width of the canvas (in pixels).
 * @param {number} height - The height of the canvas (in pixels).
 * @param {object} options - Configuration options for image generation.
 * @param {string} options.background - Background color for the image (accepts CSS colors - Hex, RGB, RGBA, HSL, HSLA, HSV, HSVA, Named)
 * @param {string} options.text - Text to display on the image.
 * @param {string} options.textColor - Text color for the image (accepts CSS colors - Hex, RGB, RGBA, HSL, HSLA, HSV, HSVA, Named).
 * @param {string} options.outputPath - Output path for the image.
 */
export async function makeImage(width, height, options) {
  try {
    const defaultOutputName = `${width}x${height}`;
    let outputDirectory = '';
    let outputName = defaultOutputName;
    let outputFormat = '.jpeg';

    if (options.outputPath) {
      const { dir, name, ext } = parse(options.outputPath);
      outputDirectory = dir;

      if (ext && ext !== '.jpeg' && ext !== '.png') {
        throw new Error('Invalid file path or extension (only .jpeg or .png)');
      } else {
        outputFormat = ext;
      }

      // Use the name from options.outputPath instead of the defaultOutputName
      if (name.length !== 0 && name !== '*') {
        outputName = name;
      }
    }

    const outputFullFilePath = join(outputDirectory, outputName + outputFormat);

    // Create a new Jimp image with the specified width and height
    const image = new Jimp(
      width,
      height,
      Jimp.cssColorToHex(options.background || '#cccccc')
    )
      .colorType(2)
      .quality(100);

    const textImage = new Jimp(width, height, 0x0);

    await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
      textImage.print(
        font,
        0,
        0,
        {
          text: options.text ?? defaultOutputName,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        },
        width,
        height
      );

      textImage.color([{ apply: 'xor', params: [options.textColor] }]);

      image.blit(textImage, 0, 0);
    });

    await image.writeAsync(outputFullFilePath);

    console.log(`Image generated at ${outputFullFilePath}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
