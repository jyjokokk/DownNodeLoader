module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { isolatedModules: true }],
  },

  rootDir: './',
  roots: ['<rootDir>/src/'],

  bail: true,
  testTimeout: 10000,
}
