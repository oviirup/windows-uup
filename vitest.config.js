/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vitest/config';

const pathAliases = {
  '@': path.resolve(__dirname, 'src'),
};

export default defineConfig({
  test: {},
  resolve: { alias: pathAliases },
});
