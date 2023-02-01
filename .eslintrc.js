module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:import/typescript',
    'plugin:storybook/recommended'
  ],
  rules: {
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': ['error'],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['\\$.*$']
      } // all our aliases start with a $ sign
    ],

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '$*/**',
            group: 'internal'
          },
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before'
          }
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'index',
          'parent',
          'sibling'
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-unused-modules': 'warn',
    'import/no-webpack-loader-syntax': 'error',
    'import/newline-after-import': [
      'error',
      {
        count: 1
      }
    ],
    'import/no-duplicates': [
      'error',
      {
        considerQueryString: true
      }
    ]
  }
}
