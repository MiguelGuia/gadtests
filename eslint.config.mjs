import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslingPluginPrettierReccomended from 'eslint-plugin-prettier/recommended';
import eslintPluginPlaywright from 'eslint-plugin-playwright';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['package-lock.json', 'playwright-report', 'test-results'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': 'error',
    },
  },

  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  eslintPluginPlaywright.configs['flat/recommended'],
  {
    rules: {
      'playwright/no-nested-step': 'off',
    },
    settings: {
      playwright: {
        globalAliases: {
          test: ['setup'],
        },
      },
    },
  },
  eslingPluginPrettierReccomended,
];
