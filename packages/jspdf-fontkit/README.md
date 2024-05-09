![NPM Version](https://img.shields.io/npm/v/jspdf-fontkit)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/jspdf-fontkit)
![NPM Type Definitions](https://img.shields.io/npm/types/jspdf-fontkit)

# jspdf-fontkit
jsPDF with fontkit for complex glyph support

## Why?
[jsPDF](https://github.com/parallax/jsPDF) is one of the best libraries for generating PDFs in the browser as well as on the server. However, it lacks full support for complex glyphs like [Indic scripts](https://en.wikipedia.org/wiki/Brahmic_scripts). If you try to generate a PDF with these scripts, you may see the characters are not rendered correctly ([check this GitHub issue](https://github.com/parallax/jsPDF/issues/2778)).

This is where jspdf-fontkit comes in. It uses [fontkit](https://github.com/foliojs/fontkit) to load fonts and convert them to a format that jsPDF can use which allows for full support of complex glyphs.

It also applies a patch to to [fontkit](https://github.com/foliojs/fontkit) to fix a rendering issue with Bengali script.

## Installation
```bash
npm install jspdf-fontkit
```

## Usage
You can use `jspdf-fontkit` the same way you would use jsPDF. Just import it from 'jspdf-fontkit' instead of 'jspdf'.

```javascript
import jsPDF from 'jspdf-fontkit';
```

## Development
Clone the repository recursively (as fontkit and jsPDF are submodules):
```bash
git clone --recursive git@github.com:rafiibrahim8/jspdf-fontkit.git
cd jspdf-fontkit
```

You need to apply the patch that will modify jsPDF to use fontkit. To do this, run the following command:
```bash
patch -p1 < submodules.patch
```

Then, install the dependencies:
```bash
pnpm install 
```
Note: This repo uses `pnpm workspaces` to manage dependencies. So, `npm` or `yarn` might not work as expected.

To build the library:
```bash
pnpm build
```
You will find the built files in the `packages/jspdf-fontkit/lib` directory.
