module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { isolatedModules: true }],
  },

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/__tests__/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/app.ts',
  ],
  collectCoverage: false,
  coverageDirectory: './coverage',

  rootDir: './',
  roots: ['<rootDir>/src/'],

  bail: true,
  testTimeout: 10000,
}
