# Acceptance Test Framework

The framework uses two major components:

1. [Cucumber](https://cucumber.io/)  -  #1 tool for [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development). Uses Gherkin as a starter language which is plain english in Given, When, Then format to structure features and scenarios

2. [NightwatchJS](http://nightwatchjs.org/) - UI testing framework, acts as an underlying execution engine for cucumber, has built in assertions
Nightwatch does not have native cucumber support, so nightwatch-cucumber port is used

### Running tests

Run a specific feature file:
`npm test -- feature/Dashboard.feature`

Run a specific tag:
`npm test -- --tag customizeDashboard`

More [here](http://mucsi96.github.io/nightwatch-cucumber/#running-tests)

### Directory structure
The directory structure looks something like this:

#### bin/ ####
contains selenium-server-standalone.jar through which the browser commands are routed from the code

#### features/ ####
contains cucumber `.feature` files in which the test scenarios and test steps are written in Gherkin format. Can further group features according to the functionality. Here ‘Plan’

*Plan.feature*:

```
@PlanCampaigns
Feature:
  UI Validation - Validate Plan : Campaign

  Background:
    Given I open the application webpage
    And I provide login credentials and submit
    And I am logged into the application

  @openPlan
  Scenario: Clicking on Plan in left navigation bar opens up Plan screen
    Given "Plan" is visible in the navigation menu
    Given I click on "Plan" navigation option
    Then I should see "Plan" screen
    And "Campaigns" is selected by default
   # And I click on New Campaign button
```

- #### step_definitions/ ####

    contains actual implementation of the steps written in the features.  The implementation uses nightwatchjs. Steps are executed according to their order in the scenario. A particular step is picked, is searched using regex in step_definitions directory, and the underlying code is executed.

*common_steps.js*:
```
Given(/^I move to "([^"]*)" section$/, async function (menuOption) {
    await commons.moveToElement('@leftMenu',10,10)
    await commons.click(navBarCss +'.'+menuOption.toLowerCase() + " a")
});
```


#### page-objects/ ####
the regular page-object stuff, contains css selectors for the page on which an operation is getting performed

*loginpage.js*:
```
module.exports = {
    url: 'https://stg-airpr-roi.herokuapp.com/',
   //url: 'https://analyst.airpr.com/login',
    elements: {
        body: 'body',
        userName: '#user_email',
        password: '#user_password',
        btnLogin: 'input.btn.btn-primary',
        loginError: '.alert.alert-danger',
        forgotPwd: 'a[href="/password/new"]'
    }
};
```

#### reports/ ####
These are generated after each run, in JSON format. Its then converted to an html report

#### screenshots/ ####
Screenshots on failure

#### test_data/ ####
Data required for tests

#### utils/ ####
Supporting files. Currently has a report parser.

#### nightwatch.conf.js ####
nightwatch cucumber [configurations](http://nightwatchjs.org/gettingstarted#settings-file).
