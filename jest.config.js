module.exports = {
  roots: [
    "./app"
  ],
  globalSetup: './test_env/setup.js',
  globalTeardown: './test_env/teardown.js',
  preset: 'ts-jest',
  testEnvironment: './test_env/mongo_env.js'
};