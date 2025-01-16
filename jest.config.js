module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { isolatedModules: true }],
  },

  rootDir: './',
  roots: ['<rootDir>/src/'],

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/__tests__/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
    '!<rootDir>/src/cli.ts',
  ],
  collectCoverage: true,
  coverageDirectory: './coverage',
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
  bail: true,
  testTimeout: 10000,
};
