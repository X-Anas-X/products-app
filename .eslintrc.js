module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/strict',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
    '@typescript-eslint',
    'eslint-plugin-no-inline-styles',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'no-var': 'error',
    'brace-style': 'error',
    'prefer-template': 'error',
    'space-before-blocks': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/no-explicit-any': 2,
    'no-inline-styles/no-inline-styles': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 1,
    'no-console': 2,
    'eslint-comments/no-unlimited-disable': 0,
    'no-empty-pattern': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {vars: 'all', argsIgnorePattern: '^_'},
    ],
  },
  globals: {
    __DEV__: true,
  },

  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.tsx',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
