const nextJest = require('next/jest');
// https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // moduleNameMapper: {
  //   // Handle module aliases (this will be automatically configured for you soon)
  //   '^@/components/(.*)$': '<rootDir>/components/$1',

  //   '^@/pages/(.*)$': '<rootDir>/pages/$1',

  //   '^@/features/(.*)$': '<rootDir>/features/$1',

  //   // '^@dsm/web/(.*)$': '<rootDir>/src/$1',
  // },
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jest-environment-jsdom',
  // modulePaths: ['<rootDir>/src/'],
  // rootDir: './src',
  resetMocks: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();

  config.transformIgnorePatterns = config.transformIgnorePatterns.filter(
    (p) => p !== '/node_modules/'
  );
  // config.transformIgnorePatterns.push('/node_modules/(?!(@dsm|nanoid))(.*)');
  return config;
};
