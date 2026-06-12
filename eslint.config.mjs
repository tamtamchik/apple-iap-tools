import stylistic from '@stylistic/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'indent': ['error', 2, { SwitchCase: 1 }],
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      'simple-import-sort/imports': ['error', {
        groups: [
          ['^\\u0000'],
          ['^node:'],
          ['^@?\\w'],
          ['/api'],
          ['/notifications'],
          ['^../'],
          ['^./'],
          ['^'],
          ['/utils'],
        ],
      }],
      'simple-import-sort/exports': 'error',
    },
  },
]
