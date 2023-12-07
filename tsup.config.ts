import { defineConfig } from "tsup";

export default defineConfig({
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  treeshake: true,
  minify: true,
  target: "es2022",
});
