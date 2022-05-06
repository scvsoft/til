module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: [
    'eslint:recommended', // default javascript best-practice rules
    'plugin:prettier/recommended', // use eslint-plugin-prettier and eslint-config-prettier,
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'no-prototype-builtins': 'off',
    'require-atomic-updates': 'off',
    'filenames/match-exported': 'off',
    'no-useless-escape': 'warn',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
