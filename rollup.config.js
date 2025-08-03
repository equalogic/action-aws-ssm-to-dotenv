import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: {
    cli: 'src/cli.ts',
    action: 'src/action.ts',
  },
  output: {
    dir: 'dist',
    format: 'es',
    esModule: true,
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [commonjs(), json(), nodeResolve({ preferBuiltins: true }), typescript()],
};

export default config;
