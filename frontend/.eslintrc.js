module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'react/prop-types': 0
  },
}
