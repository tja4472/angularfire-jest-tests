Upgrade to 9.2.0 gives error in jest unit tests
https://github.com/firebase/firebase-js-sdk/issues/5687

- npm 8.1.0
- node v16.13.0

```bash
> Executing task: npm run test <


> ng-jest-cypress-template@0.0.0 test
> jest

ngcc-jest-processor: running ngcc
 PASS  src/app/services/service-a.service.spec.ts
 PASS  src/app/app.component.spec.ts
 FAIL  src/app/issue.spec.ts
  ● Test suite failed to run

    TypeError: The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received 'http://localhost/index.node.cjs.js'

      at Function.createRequire (node_modules/jest-runtime/build/index.js:1813:23)

 FAIL  src/app/issue-compat.spec.ts
  ● Test suite failed to run

    TypeError: The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received 'http://localhost/index.node.cjs.js'

      at Function.createRequire (node_modules/jest-runtime/build/index.js:1813:23)

Test Suites: 2 failed, 2 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        8.998 s
Ran all test suites.
```
