import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import ReactCompiler from "babel-plugin-react-compiler";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ babel: { plugins: [ReactCompiler] } })],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
