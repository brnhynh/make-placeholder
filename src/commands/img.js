import { Command } from 'commander';

import { makeImage } from '../utils/make-image';

export const imgCommand = new Command('img')
  .description('Generate an image placeholder.')
  .argument('<width>', 'Image width (in pixels).')
  .argument(
    '[height]',
    'Image height (in pixels). Optional, defaults to width.'
  )
  .option(
    '-b, --background <background>',
    'Background color for the image. (e.g., "#FF0000")',
    '#cccccc'
  )
  .option('-t, --text <text>', 'Text to display on the image.')
  .option(
    '-c, --text-color <text_color>',
    'Text color for the text. (e.g., "#0000FF")',
    '#909090'
  )
  .option(
    '-o, --output-path <output_path>',
    'Output path for the image. (e.g., "/path/to/output/example.jpeg")'
  )
  .action(async (width, height, options) => {
    await makeImage(
      parseInt(width, 10),
      parseInt(height ?? width, 10),
      options
    );
  });
