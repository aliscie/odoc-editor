import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

const packageJson = require('./package.json');

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            name: 'react-lib',
            inlineDynamicImports: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
            inlineDynamicImports: true,

        }
    ],
    plugins: [
        external(),
        resolve(),
        commonjs(),
        typescript({tsconfig: './tsconfig.json'}),
        postcss(),
        terser(),
        json(),
    ]
}
