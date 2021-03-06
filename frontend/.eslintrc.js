module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'react/prop-types': 0
  },
}
