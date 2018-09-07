var reporter = require('cucumber-html-reporter')


var createReport ;

createReport= function () {
    let reportOptions = {
        theme: 'hierarchy',
        name: 'AirPR',
        brandTitle: 'AirPR Acceptance Test Report',
        jsonFile: './reports/cucumber.json',
        output: './reports/test-report.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
        ignoreBadJsonFile: true
    };
    reporter.generate(reportOptions);
};

createReport();