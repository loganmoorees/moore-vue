module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': 'off',
    'no-irregular-whitespace': 'off',
    "quotes": [0, "single"],
    'space-before-function-paren': 0,
    'semi': 0,
    'indent': ["off", 2]
  }
}
