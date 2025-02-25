import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'mfeWidgets',
      filename: 'remoteEntry.js',
      exposes: {
        './button': './src/components/button.tsx',
        './card': './src/components/card.tsx',
        './tailwind': './src/App.css',
        './types': './src/types/index.ts'
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  output: {
    publicPath: 'http://localhost:3005/', // Adjust if needed
    library: 'mfeWidgets', // Important: Defines global variable
    libraryTarget: 'umd', // Ensures it’s accessible in window
  },
  server: {
    port: 3005,
  },
});