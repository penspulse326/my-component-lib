import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginStorybook from 'eslint-plugin-storybook';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['**/dist', '**/.turbo', '**/.swc', '**/coverage', '**/storybook-static', '**/*.d.ts'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginPerfectionist.configs['recommended-natural'],

  // 1. Base JS/TS Setup for all packages
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'eslint.config.js',
            'stylelint.config.js',
            'commitlint.config.js',
            'packages/*/.storybook/*.ts',
          ],
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 20,
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // 2. React Package Specifics
  {
    ...pluginJsxA11y.flatConfigs.recommended,
    files: ['packages/react/**/*.{ts,tsx}'],
  },
  {
    files: ['packages/react/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // 3. Vue Package Specifics
  ...pluginVue.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['packages/vue/**/*.{vue,ts,tsx}'],
    rules: {
      ...config.rules,
      'vue/multi-word-component-names': 'off',
    },
  })),
  {
    files: ['packages/vue/**/*.{vue,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
    plugins: {
      'vuejs-accessibility': pluginVueA11y,
    },
    rules: {
      ...pluginVueA11y.configs['recommended'].rules,
    },
  },

  // 4. Storybook Specifics (Applied globally coverage for story files)
  ...pluginStorybook.configs['flat/recommended'],

  // 5. Prettier (Must be last to override format-related rules)
  prettier,
]);
