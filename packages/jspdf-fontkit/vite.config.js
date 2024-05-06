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
  ],
});
