module.exports = {
    modulePaths: ['<rootDir>/node_modules/'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/tests/mocks/fileMock.js',
      '\\.(css|scss)$': '<rootDir>/tests/mocks/styleMock.js', 
      "^meteor/(.*)": "<rootDir>/tests/mocks/meteorMocks/index.js"
    },
    setupTestFrameworkScriptFile: "<rootDir>/tests/setup.js",
  };