module.exports = {
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testEnvironment": "node",
  "testRegex": "/__tests__/.*\\.(test|spec)\\.(t|j)sx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/__tests__/",
    "/__mocks__/",
  ],
  "globals": {
    "ts-jest": {
      "diagnostics": true
    }
  },
  // "coverageThreshold": {
  //   "global": {
  //     "branches": 90,
  //     "functions": 95,
  //     "lines": 95,
  //     "statements": 95
  //   }
  // },
  // "collectCoverageFrom": [
  //   "src/*.{js,ts}"
  // ],
};