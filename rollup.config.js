import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/action.ts',
  output: {
    esModule: true,
    file: 'dist/action.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [commonjs(), json(), nodeResolve({ preferBuiltins: true }), typescript()],
};

export default config;
