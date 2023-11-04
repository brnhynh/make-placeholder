# make-placeholder

**make-placeholder** is a command-line tool designed for generating placeholders offline for your projects.

## Getting Started

### Prerequisites

- `Node.js >= 16.x`

### Installation

To install **make-placeholder** globally, use the following command:

```bash
npm install -g make-placeholder
```

## Usage

#### Command

The primary command provided by **make-placeholder** is `img`. You can use this command to generate image placeholders with various customization options.

### Command Syntax

```bash
make-placeholder img <width> [height] [options]
```

- `<width>` (in pixels): The width of the image (required).
- `[height]` (in pixels): The height of the image (optional, defaults to the width).
- `[options]`: Additional options to customize the image placeholder.

### Command Flags

- `-b, --background <background>`: Set the background color for the image (e.g., "#FF0000"). Default: `#cccccc`.
- `-c, --text-color <text_color>`: Define the text color for the text on the image (e.g., "#0000FF"). Default: `#909090`.
- `-t, --text <text>`: Specify the text to display on the image.
- `--font-size <font_size>`: Set the font size for the text (e.g., "24px" or "auto"). Default: `auto`.
- `--font-family <font_family>`: Choose the font family for the text (e.g., "Arial"). Default: `Arial`.
- `-o, --output-path <output_path>`: Set the output path for the image (e.g., "/path/to/output/example.jpeg").

### Examples

#### Basic Usage

Generate a 256x256px image placeholder with default settings:

```bash
make-placeholder img 256
```

![Basic Usage Example](https://github.com/brnhynh/make-placeholder/raw/main/examples/256x256.jpeg)

**Note**: When not providing a custom name using the `-o` flag, the output file name will be automatically created based on the image dimensions, followed by the format (defaulting to JPEG). For instance, generating a 256x256px JPEG image will produce a file named "256x256.jpeg".

#### Customization

Generate a 512x256px image placeholder with a black background, white text, and a custom text message:

```bash
make-placeholder img 512 256 -b "#000000" -c white -t "Hello, world"
```

![Customization Example](https://github.com/brnhynh/make-placeholder/raw/main/examples/512x256.jpeg)

#### Path for Output

Generate a 128x128px image placeholder and save it to a specific directory:

```bash
make-placeholder img 128 -o "/path/to/folder/placeholder.jpeg"
```

## Issues

If you encounter any issues or have suggestions for improvement, please [open an issue](https://github.com/brnhynh/make-placeholder/issues).

## Contribute

Contributions are welcome! Please check the [Contributing Guidelines](https://github.com/brnhynh/make-placeholder/blob/main/CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/brnhynh/make-placeholder/blob/main/LICENSE) file for details.
