// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import fs from "fs";
import JsPdfPkg from "../jsPDF/package.json";
import fontKitPkg from "../fontkit/package.json";

const outDir = resolve(__dirname, "lib");
const typesDir = resolve(__dirname, "types");

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
      entry: resolve(__dirname, "src/index.js"),
      name: "jspdf-fontkit",
      fileName: "jspdf-fontkit",
    },
    rollupOptions: {
      external: jsPdfOptionalDeps,
    },
  },
  plugins: [
    {
      name: "copy index.d.ts",
      buildEnd() {
        fs.mkdirSync(typesDir, { recursive: true });
        fs.readdirSync(typesDir).forEach((file) => {
          fs.unlinkSync(resolve(typesDir, file), { recursive: true });
        });
        const src = resolve(__dirname, "../jsPDF/types/index.d.ts");
        const dest = resolve(typesDir, "index.d.ts");
        fs.copyFileSync(src, dest);
      },
    },
  ],
});
