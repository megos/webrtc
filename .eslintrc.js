// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  globals: {
    ScreenShare: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi-spacing': [
      'error'
    ],
    'keyword-spacing': [
      'error'
    ],
    'space-before-blocks': [
      'error'
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'space-infix-ops': [
      'error'
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'no-unused-vars': [
      'warn',
      {
        'vars': 'local',
        'args': 'after-used'
      }
    ],
    'eqeqeq': [
      'error',
        'smart'
    ],
    'key-spacing': [
      'error',
      {
        'beforeColon': false,
        'afterColon': true
      }
    ],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      'error',
      'never'
    ],
    'no-irregular-whitespace': [
      'error',
      {
        'skipRegExps': true
      }
    ],
    'quote-props': [
      'error',
      'as-needed'
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'space-before-function-paren': [
      'error',
      'always'
    ],
    'arrow-parens': [
      'error'
    ],
    'arrow-spacing': [
      'error'
    ],
    'no-class-assign': [
      'error'
    ],
    'no-const-assign': [
      'error'
    ],
    'no-dupe-class-members': [
      'error'
    ],
    'no-var': [
      'error'
    ],
    'prefer-arrow-callback': [
      'error'
    ],
    'prefer-const': [
      'error'
    ],
    'prefer-template': [
      'error'
    ]
  }
}
