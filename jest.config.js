const nextJest = require('next/jest');

// Provide the path to your next.config.js and src folder
const createJestConfig = nextJest({
  dir: './',
});

// Any custom Jest settings you want to add
const customJestConfig = {
  // Files that run after the test environment is set up
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Test environment (jsdom for simulating a browser)
  testEnvironment: 'jest-environment-jsdom',
  // Folders where Jest should look for tests
  roots: ['<rootDir>/src'], // If you place tests in src/__tests__
  // Modules that should be transformed by Babel/SWC (usually handled by next/jest)
  // transform: {
  //   '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  // },
  // Module name mapping (for aliases like @/components)
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    // For CSS Modules files
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Or 'jest-css-modules-transform'
  },
  // Folders to ignore in test coverage reports
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/pages/_app.tsx',
    '<rootDir>/src/pages/_document.tsx',
    '<rootDir>/src/types/',
    // Config or type files that are not tested
  ],
  // Collect test coverage report
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts', // Exclude type definition files
    '!src/**/index.ts', // Ignore index files that only export
  ],
};

// createJestConfig is exported this way so next/jest can load the Next.js config for Jest
module.exports = createJestConfig(customJestConfig);