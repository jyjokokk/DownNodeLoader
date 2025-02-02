import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
    },
    ignores: ['**/*.js', '**/*.mjs'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        tsconfigRootDir: '/Users/jyrki/Code/JavaScript/DownNodeLoader',
        project: ['./tsconfig.eslint.json'],
      },
    },

    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',

      quotes: [
        'warn',
        'single',
        {
          avoidEscape: true,
        },
      ],

      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],

    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
