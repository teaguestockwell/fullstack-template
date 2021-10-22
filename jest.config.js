const {defaults} = require('jest-config')

module.exports = {
  ...defaults,
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/utils/',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/__tests__/',
    '/types',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'pages/api/**/*.{ts,tsx}',
    'middleware/**/*.{ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/utils/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./__tests__/utils/jest.setup.ts'],
}
