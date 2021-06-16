module.exports = {
  root: true,
  'env': {
    'es6': true,
    'node': true,
    'mocha': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'globals': {
    'document': true,
  },
  'rules': {
    'no-prototype-builtins': 'warn',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'multiline-ternary': [ 'error', 'never' ],
    'require-await': 'error',
    'eol-last': [ 'error', 'always' ],
    'object-shorthand': [ 'error', 'properties' ],
    'require-atomic-updates': 'warn',
    'indent-legacy': [
      'warn',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'rest-spread-spacing': [
      'error',
    ],
    'no-trailing-spaces': [
      'error',
    ],
    'spaced-comment': [
      'error',
      'always',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'curly': [ 2 ],
    'keyword-spacing': [ 'error', {
      'before': true,
      'after': true,
    }],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'none',
      },
    ],
    'brace-style': [
      'error',
      '1tbs',
      {
        'allowSingleLine': true,
      },
    ],
    'max-len': [
      'warn',
      {
        'code': 180,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreTrailingComments': true,
        'ignoreComments': true,
      },
    ],
    'max-lines-per-function': [
      'off',
      40,
    ],
    'no-useless-escape': [
      'warn',
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
      },
    ],
    'no-multi-spaces': [
      'error',
      {
        'ignoreEOLComments': true,
      },
    ],
    'no-return-await': 'error',
    'space-in-parens': [ 'error', 'never' ],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'functions': 'never',
      },
    ],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true,
      },
    ],
    'no-unsafe-optional-chaining': [
      'error',
      {
        'disallowArithmeticOperators': true,
      },
    ],
    'array-bracket-spacing': [
      'error',
      'always',
      {
        'singleValue': true,
        'objectsInArrays': false,
        'arraysInArrays': false,
      },
    ],
  },
};
