// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import JsPdfPkg from "../jsPDF/package.json";
import fontKitPkg from "../fontkit/package.json";
import { execSync } from "child_process";

const outDir = resolve(__dirname, "../../lib");

jsPdfOptionalDeps = [
  ...Object.keys(JsPdfPkg.peerDependencies || {}),
  ...Object.keys(JsPdfPkg.optionalDependencies || {}),
  ...Object.keys(fontKitPkg.peerDependencies || {}),
  ...Object.keys(fontKitPkg.optionalDependencies || {}),
  ...Object.keys(fontKitPkg.devDependencies || {}),
  ...Object.keys(fontKitPkg.devDependencies || {}),
];

export default defineConfig({
  build: {
    outDir: outDir,
    lib: {
      entry: resolve(__dirname, "lib/index.js"),
      name: "jspdf-fontkit",
      fileName: "jspdf-fontkit",
    },
    rollupOptions: {
      external: jsPdfOptionalDeps,
    },
  },
  plugins: [
    {
      name: "empty-outdir",
      buildStart() {
        console.info(`Cleaning output directory: ${outDir}`);
        execSync(`rm -rf "${outDir}"`);
      },
    },
    {
      name: "generate-json",
      buildStart() {
        console.info("Generating trie data...");
        execSync(
          "exit 0; npm run trie:data && npm run trie:use && npm run trie:indic",
          {
            cwd: resolve(__dirname, "../fontkit"),
          }
        );
        console.info("Trie data generated.");
      },
    },
  ],
});
