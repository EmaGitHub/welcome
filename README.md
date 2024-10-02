# Solution 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

***
# FrontEnd Unit Test & Code Coverage - TQS

Inside the PLTS001 you'll find this script in the package.json

```javascript
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "build_PROD": "ng build --base-href=/$npm_package_context_contextname/ --prod",
  "build_LOCAL": "ng build --base-href=/%npm_package_context_contextname%/ --prod",
  "test": "ng test",
  "test_LOCAL": "ng test --watch false --code-coverage true --browsers ChromeHeadless",
  "test_PROD": "ng test --watch false --code-coverage true --browsers ChromeHeadless",
  "lint": "ng lint",
  "e2e": "ng e2e"
},
```

The scripts test_LOCAL and test_PROD essentially trigger the native test process in Angular which is made by Karma/Jasmine.
You can run these two scripts or via "npm run test_LOCAL" or inside the "build_local.cmd" in the `repo_structure/` folder.

What these two script does is to run tests that are written inside the *.spec.ts files generated in Angular. The configuration for these tests is inside the karma.config.js file here.
In this configuration we've added few modifications:

1. export unit test in JUnit XML format with these mods:
```javascript
module.exports = function (config) {
    config.set({
        ...,
        plugins: [
            ...
                require('karma-junit-reporter'),
            ...
        ],
        ...,
        reporters: ['progress', 'junit', 'coverage'],
        // the default configuration
        junitReporter: {
            outputDir: '../../../../target/fe-karma/', // results will be saved as $outputDir/$browserName.xml
            outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
        },
    });
};
```

2. export unit test & code coverage in specific folders ("target/fe-cobertura", "target/fe-karma", "coverage/"):
```javascript
coverageReporter: {
    reporters: [
        {type: 'cobertura', dir: '../../../../target/fe-cobertura/'},
        {type: 'html', dir: 'coverage/'},
    ],
        subdir: '.',
...
},
...
junitReporter: {
    outputDir: '../../../../target/fe-karma/', // results will be saved as $outputDir/$browserName.xml
},
```
In this way, we have the classic index.html report for the code coverage inside the classic "coverage" folder, but we've also unit test result (in JUnit Style) and the coverage report (as Cobertura coverage) inside "target/fe-karma" & "target/fe-cobertura".

The final consideration is about the test_LOCAL & test_PROD scripts; they do the same stuff which is "ng test --watch false --code-coverage true --browsers ChromeHeadless" which says: "please run tests without watch mode (run only one time), generating the code coverage, and using a silent browser like ChromeHeadless.

Once you've run the script (build_local.cmd or npm run test_LOCAL) you should see these files:
```
- repo_structure
    - containers
    - hooks
    - ...
    - target
        - fe-cobertura
            cobertura-coverage.xml
        - fe-karma
            TEST.xml
```

This means that tests ran and the output of both JUnit results as well as Code Coverage have been generated.

At this stage, because right now these tests cannot run inside the CI/CD pipeline, you've to run them before committing the whole project every time.