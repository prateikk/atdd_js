const {client} = require('nightwatch-cucumber');
const {Given, Then, When} = require('cucumber');
const commons = client.page.commons();
const login = client.page.loginpage();
const dashboard = client.page.dashboardPage();
var data = require('../../config/login');

Given(/^I open the application webpage$/, async function () {
    await login.navigate();
});

When(/^I am on login page$/, async function () {
    await login.waitForElementPresent('@userName',data.DEFAULT_TIMEOUT);
    await login.assert.visible('@userName');
});

Then(/^I am logged into the application$/, async function () {
    await dashboard.waitForElementVisible('@dashboardHeader', data.DEFAULT_TIMEOUT);
});

Then(/^I should see Login button and forgot password option$/, async function () {
    await login.assert.visible('@btnLogin');
    await login.assert.visible('@forgotPwd');
});

Then(/^I provide login credentials and submit$/, async function () {
    await login.setValue('@userName', client.globals.username)
                .setValue('@password', client.globals.password)
                .click('@btnLogin')
                .waitForElementNotPresent('@btnLogin', data.DEFAULT_TIMEOUT);
});

Then(/^I do not provide login credentials and submit$/, async function () {
    await login.setValue('@userName', '')
                .setValue('@password', '')
                .click('@btnLogin');
});

Then(/^I should see the error message "([^"]*)" for Password field$/, async function (message) {
    await login.assert.containsText('@loginError', message);
});

Then(/^I provide invalid login credentials and submit$/, async function () {
    await login.setValue('@userName', data.invalidUsername)
            .setValue('@password', data.invalidPassword)
            .click('@btnLogin');
});

Given(/^I log into the application$/, async function () {
    await login.navigate();
    await login.waitForElementVisible('@userName',data.DEFAULT_TIMEOUT);
    await login.assert.visible('@userName');
    await login.setValue('@userName', client.globals.username)
               .setValue('@password', client.globals.password)
               .click('@btnLogin')
               .waitForElementNotPresent('@btnLogin', data.DEFAULT_TIMEOUT);
    await dashboard.waitForElementVisible('@dashboardHeader', data.DEFAULT_TIMEOUT);
});
