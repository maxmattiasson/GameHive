module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",

  testMatch: ["**/tests/**/*.test.ts"],

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
};
