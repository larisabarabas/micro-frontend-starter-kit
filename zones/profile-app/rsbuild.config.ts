import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  dev:{
    assetPrefix: '/profile'
  },
  server: {
    port: 3006,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type"
    },
  },
  output: {
    publicPath: "http://localhost:3006/",
  }
});
