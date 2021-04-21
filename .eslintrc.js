module.exports = {
  parser: 'babel-eslint',

  settings: {
    react: {
      version: 'detect', // Automatically detect the react version, will be set by default in the next major version.
    },

    'import/resolver': 'webpack', // Take all defaults
  },

  env: {
    browser: true,
    es2020: true,
  },

  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Must be last to override other formatting rules.
  ],

  plugins: ['eslint-plugin-babel'],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    sourceType: 'module',

    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'no-new': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    'linebreak-style': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'default-case': 'off',
    'no-fallthrough': 'off',
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': [
      'error',
      { allowTernary: true, allowShortCircuit: true },
    ],
    'no-restricted-globals': ['error', 'event'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    // To use new JSX transform.
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },

  reportUnusedDisableDirectives: true,
};
