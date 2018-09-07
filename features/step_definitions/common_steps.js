const {client} = require('nightwatch-cucumber')
const {Given, Then, When} = require('cucumber');
const commons = client.page.commons();
var data = require('../../config/login')

//dynamic locators
var navBarCss = ".ui-nav-left-content ul ";

Given(/^"([^"]*)" is visible in the navigation menu$/, async function (menuOption) {
    await commons.moveToElement('@leftMenu', 10, 10);
    client.pause(500);
    await client.useCss().assert.visible(navBarCss + '.' + menuOption.toLowerCase());
});

When(/^I click on "([^"]*)" navigation option$/, async function (menuOption) {
    await client.useCss().click(navBarCss + '.' + menuOption.toLowerCase() + " a");

});

Given(/^I am on "([^"]*)" screen$/, async function (pageHeader) {
    await client.pause(data.SHORT_DELAY);
    await verifyPage(pageHeader);
});



Then(/^I should see "([^"]*)" screen$/, async function (pageHeader) {
    await verifyPage(pageHeader);
});

async function verifyPage(pageHeader) {
    switch (pageHeader) {
        case 'Plan':
            await commons.expect.element('@planContainer').to.be.visible.before(data.DEFAULT_TIMEOUT);
            break;
        case 'Dashboard':
            await commons.expect.element('@dashboardContainer').to.be.visible.before(data.DEFAULT_TIMEOUT);
            break;
        case 'Analyze':
            await commons.expect.element('@analyzeContainer').to.be.visible.before(data.DEFAULT_TIMEOUT);
            break;
        case 'Report':
            await commons.expect.element('@reportContainer').to.be.visible.before(data.DEFAULT_TIMEOUT);
            break;
        default:
            console.log('Invalid Page');
    }
}


Given(/^I move to "([^"]*)" section$/, async function (menuOption) {
    await commons.moveToElement('@leftMenu', 10, 10);
    await commons.click(navBarCss + '.' + menuOption.toLowerCase() + " a");
});

Given(/^I log out of the application$/, async function () {
    await commons.moveToElement('@leftMenu', 10, 10);
    await client.pause(2000);
    await client.useCss().click('.logout a');
    await client.pause(3000);
});

Then(/^I make the following validations$/, async function () {
    //Does nothing, just for better readability
});

Given(/^I click on "([^"]*)" button$/, async function (buttonName) {
    var selector = '//*[contains(@class, "btn") and contains(normalize-space(),"'+buttonName+'")]';
    await client
        .useXpath()
        .waitForElementVisible(selector, data.DEFAULT_TIMEOUT)
        .click(selector);
    if(buttonName==='Continue')
    await client.pause(500);
});

Then(/^I click on "([^"]*)" linktext$/,async function(linktext){
    await client.useXpath().click('//a[contains(normalize-space(),"'+linktext+'")]');
});

Then(/^I should see "([^"]*)" linktext$/, async function (linktext) {
    await client.useXpath().waitForElementVisible('//a[contains(normalize-space(),"'+linktext+'")]',data.DEFAULT_TIMEOUT);
});