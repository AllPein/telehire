const prettierConfig = require('./.prettierrc.js');

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin/import',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: '*.{ts, tsx}',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
      settings: {
        'import/resolver': {
          alias: {
            extensions: ['.ts', '.tsx'],
            map: [['@', './src']],
          },
        },
      },
    },
  ],
  rules: {
    'comma-dangle': 'off',
    'no-console': 'warn',
    'prettier/prettier': ['error', prettierConfig],
    'quote-props': ['error', 'consistent-as-needed'],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'pathGroups': [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'react/require-default-props': 'off',
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'no-use-before-define': 'off',
    'no-shadow': 'off',

    // Typescript
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
