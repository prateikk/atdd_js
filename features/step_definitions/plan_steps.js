const {Given, When, Then} = require('cucumber');

const {client} = require('nightwatch-cucumber')
const plan = client.page.plan();
var data = require('../../config/login');

var planCampaignName;
var postPath = '\')]';
var campaignNameBasePath = '//div[@class=\'ui-card card ember-view\']//div[@class=\'campaign-card-name\'][contains(text(),\'';
var numberOfTiles = 0;

Then(/^"([^"]*)" is selected by default$/, function (submenu) {
    plan.expect.element('@submenu').text.to.contain(submenu);
});

Given(/^I enter following phrases in the text area$/, async function (tableData) {
    plan.waitForElementVisible('@textAreaForCampaign', data.DEFAULT_TIMEOUT);
    tableData.raw().forEach(async function (element) {
        console.log(element[0]);
        await plan.setValue('@textAreaForCampaign', element[0] + '\n');
    });
    await client.pause(1000);
});


Given(/^I enter following keywords in the text area$/, async function (tableData) {
    plan.waitForElementVisible('@textAreaForCampaign',data.DEFAULT_TIMEOUT);
    tableData.raw().forEach(async function (element) {
        console.log(element[0]);
        await plan.setValue('@textAreaForCampaign', element[0] + '\n');
    });
    await client.pause(1000);
});

Then(/^I choose the volume coverage option as "([^"]*)"$/, async function (option) {
    await client
        .useXpath()
        .click('//div[@class=\'form-check\']//span[normalize-space()=\'' + option + '\']/preceding-sibling::input');
});
Then(/^I select campaign duration as "([^"]*)"$/, async function (dateRange) {
    await client
        .useXpath()
        .click('//div[@class=\'form-check\']//span[normalize-space()=\'' + dateRange + '\']/preceding-sibling::input');
});
Then(/^I should see "([^"]*)" on screen$/, function (pageText) {
    client
        .useXpath()
        .expect.element('//*[contains(.,"' + pageText + '")]').to.be.visible.before(data.DEFAULT_TIMEOUT);
});
Then(/^I give campaign name as "([^"]*)"$/, async function (campaignName) {
    planCampaignName = campaignName + Math.floor((Math.random() * 10000) + 1);
    plan.setValue('@campaignName', planCampaignName);
});
Then(/^I should see "([^"]*)" button$/, async function (buttonText) {
    await client
        .useXpath()
        .expect.element('//button[normalize-space(.) = \'' + buttonText + '\']').to.be.visible.before(10000);
    await client.pause(1000);
});

Then(/^I should see newly created campaign in campaign list$/, async function () {
    await client
        .useXpath()
        .waitForElementVisible(campaignNameBasePath + planCampaignName + postPath, data.DEFAULT_TIMEOUT)
        .expect.element(campaignNameBasePath + planCampaignName + postPath).to.be.visible;
});

Then(/^I should see "([^"]*)" input box$/, async function (placeholder) {
    await client
        .useXpath()
        .waitForElementVisible('//input[@placeholder="' + placeholder + '"]', data.DEFAULT_TIMEOUT)
        .expect.element('//input[@placeholder="' + placeholder + '"]').to.be.visible;
});

Then(/^I set "([^"]*)" as "([^"]*)" on Plan "([^"]*)" page$/, async function (placeholder, campaignName, pageName) {
    await client
        .useXpath()
        .waitForElementVisible('//input[@placeholder="' + placeholder + '"]', data.DEFAULT_TIMEOUT)
        .clearValue('//input[@placeholder="' + placeholder + '"]')
        .setValue('//input[@placeholder="' + placeholder + '"]', campaignName)
        .pause(data.SHORT_DELAY);
});

Then(/^I should see "([^"]*)" named "([^"]*)" on Plan "([^"]*)" page$/, async function (planType, campaignName, pageName) {
    await client
        .useXpath()
        .waitForElementVisible('//div[@class="ui-card card ember-view"]//*[contains(.,"' + campaignName + '")]/parent::div[contains(@class,"ui-card-header")]', data.DEFAULT_TIMEOUT)
        .expect.element('//div[@class="ui-card card ember-view"]//*[contains(.,"' + campaignName + '")]/parent::div[contains(@class,"ui-card-header")]').to.be.visible;

    await client
        .elements('xpath', '//div[@class="ui-card card ember-view"]//*[contains(.,"' + campaignName + '")]/parent::div[contains(@class,"ui-card-header")]', function (result) {
            console.log('numberOfTiles::::::::::' + result.value.length)
            numberOfTiles = result.value.length;
        });
});

Then(/^I click on option menu$/, async function () {
    await client.useCss().click('.ui-three-dots');
});

Then(/^I click on "([^"]*)" Dropdown item$/, async function (option) {
    await client.useXpath().click('//li[contains(.,"' + option + '")]');
});

Then(/^I should see Confirmation Prompt to "([^"]*)"$/, async function (modelWindowName) {
    await client.useCss().waitForElementVisible('.modal-dialog', data.DEFAULT_TIMEOUT);
});

Then(/^I should see count of Campaign is decreased$/, async function () {

    await client
        .elements('css selector', '.campaign-card', function (result) {
            console.log(numberOfTiles + '::::::::' + result.value.length);
            return client.assert.ok(numberOfTiles > result.value.length);
        });
});