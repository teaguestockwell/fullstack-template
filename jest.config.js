const {defaults} = require('jest-config')

module.exports = {
  ...defaults,
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/.husky/',
    '<rootDir>/coverage/',
    '<rootDir>/.husky/',
    '<rootDir>/http',
    '<rootDir>/__tests__/utils/setup/',
  ],
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/__tests__/',
    '<rootDir>/types',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.{ts,tsx}',
    '<rootDir>/hooks/**/*.{ts,tsx}',
    '<rootDir>/pages/api/**/*.{ts,tsx}',
    '<rootDir>/middleware/**/*.{ts,tsx}',
    '<rootDir>/services/**/*.{ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/utils/__mocks__/fileMock.js',
  },
  // https://github.com/kentcdodds/jest-setup-files-after-env-example
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './__tests__/utils/setup/local_storage.ts',
    './__tests__/utils/setup/media.ts',
    './__tests__/utils/setup/msw.ts',
  ],
  resetMocks: true,
  testTimeout: 10000,
}
