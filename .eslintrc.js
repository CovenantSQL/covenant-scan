module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        tabWidth: 4,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        parser: 'vue',
      },
    ],
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
}