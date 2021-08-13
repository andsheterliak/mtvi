const settings = {
  react: {
    version: 'detect', // Automatically detect the react version, will be set by default in the next major version.
  },

  'import/resolver': 'webpack', // Take all defaults
};

const env = {
  browser: true,
  es2021: true,
  node: true,
};

const parserOptions = {
  sourceType: 'module',
  requireConfigFile: false,

  ecmaFeatures: {
    jsx: true,
  },
};

const noUnusedExpressions = [
  'error',
  { allowTernary: true, allowShortCircuit: true },
];

const rules = {
  'no-console': 'off',
  'no-param-reassign': 'off',
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'func-names': 'off',
  'no-restricted-globals': ['error', 'event'],
  'import/prefer-default-export': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-continue': 'off',
  'no-restricted-syntax': 'off',
  'class-methods-use-this': 'off',
  'no-use-before-define': ['error', { functions: false }],
  'no-unused-expressions': 'off', // Disable the rule to enable for a specific parser later.
  'react/prop-types': 'off',
  // To use new JSX transform.
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
};

const getExtends = (...extraExtends) => {
  return [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    ...extraExtends,
    'plugin:prettier/recommended', // Must be last to override other formatting rules.
  ];
};

module.exports = {
  overrides: [
    {
      files: '**/*.js',
      parser: '@babel/eslint-parser',
      env,
      settings,
      parserOptions,
      extends: getExtends(),
      plugins: ['@babel'],

      rules: {
        ...rules,
        '@babel/no-unused-expressions': noUnusedExpressions,
      },
    },

    {
      files: '**/*.{tsx,ts}',
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
        ...rules,
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-expressions': noUnusedExpressions,
        'no-useless-constructor': 'off', // Disable to add support for 'Parameter Properties' (shorthand for constructor parameters).
      },
    },
  ],

  reportUnusedDisableDirectives: true,
};
