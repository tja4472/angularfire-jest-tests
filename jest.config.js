require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  runner: 'groups',
  testEnvironment: 'node',
  /*
    https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

    tsconfig.json
    "paths": {
      "@app/*": ["src/app/*"]
    }
  */
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
  // set the value to the custom resolver created in step 1
  resolver: '<rootDir>/my-module-resolve.js',
  // browser bundles in firebase are ESM, transform them to CJS to work in Jest
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@firebase.*)/)'],
};
