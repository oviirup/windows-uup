import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import config_prettier from 'eslint-config-prettier'
import plugin_onlyWarn from 'eslint-plugin-only-warn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

/** @type {import('eslint').Linter.Config[]} */
const config = [
  config_prettier,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      onlyWarn: plugin_onlyWarn,
    },
    rules: {
      // disable some strict typescript rules
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-namespace': 0,
      // custom rules
      'eqeqeq': 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    ignores: ['node_modules/**', '.next/**', '.uup/**', 'out/**'],
  },
]

export default config
