const { dirNames } = require('./webpack/helpers.conf');

const settings = {
  react: {
    version: 'detect', // Automatically detect the react version, will be set by default in the next major version.
  },

  'import/resolver': 'webpack', // Take all defaults
};

const env = {
  node: true,
  browser: true,
  es2021: true,
};

const parserOptions = {
  sourceType: 'module',

  ecmaFeatures: {
    jsx: true,
  },
};

const clientRules = {
  'react/prop-types': 'off',
};

const getExtends = (...extraExtends) => [
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:react-hooks/recommended',
  'plugin:jsx-a11y/recommended',
  'plugin:import/recommended',
  ...extraExtends,
  'plugin:prettier/recommended', // Must be last to override other formatting rules.
];

module.exports = {
  overrides: [
    {
      files: `./${dirNames.src}/**/*.js`,
      parser: '@babel/eslint-parser',
      env,
      settings,
      parserOptions,
      extends: getExtends(),
      plugins: ['@babel'],

      rules: {
        ...clientRules,
      },
    },

    {
      files: `./${dirNames.src}/**/*.{ts,tsx}`,
      parser: '@typescript-eslint/parser',
      settings,
      env,

      parserOptions: {
        ...parserOptions,
        project: './tsconfig.json',
      },

      extends: getExtends(
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ),

      rules: {
        ...clientRules,
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },

    // Simple config for nodejs files like webpack and netlify functions.
    {
      files: '**/*.js',
      excludedFiles: `./${dirNames.src}/**/*.js`,
      parser: '@babel/eslint-parser',

      env: {
        es2021: true,
        node: true,
      },

      parserOptions: {
        sourceType: 'module',
      },

      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:node/recommended',
        'plugin:prettier/recommended', // Must be last to override other formatting rules.]
      ],

      plugins: ['@babel'],

      rules: {
        'global-require': 'off', // Is deprecated
        'node/no-unpublished-require': 'off',
      },
    },
  ],

  reportUnusedDisableDirectives: true,
};
