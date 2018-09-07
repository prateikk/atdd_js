const { Given, When, Then } = require('cucumber');
const { client } = require('nightwatch-cucumber');
const dashboard = client.page.dashboardPage();
const analyze = client.page.analyze();
var data = require('../../config/login');
var helper = require('../../utils/helpers');

var newArticleCount = 0;
var oldArticleCount;


Then(/^I should see campaign legend is applied to Analyze tile$/, function () {
    return dashboard.getText('@campaignDropdown', function (currentCampaign) {

        console.log(currentCampaign.value);
        helper.waitForElement('//*[@class="legend-item" and contains(.,"'+currentCampaign.value+'")]');
        analyze.expect.element('@legendItem').text.to.contain(currentCampaign.value).after(3000);
        return client.pause(1000);
    })
});


Then(/^I should see profile legend is applied to Analyze tile$/, async function () {
    await dashboard.waitForElementVisible('@profileDropdown',data.DEFAULT_TIMEOUT);
    return dashboard.getText('@profileDropdown', function (currentProfile) {
        var cleanedProfileName = currentProfile.value;
        if (currentProfile.value.includes("(")) {
            cleanedProfileName = currentProfile.value.slice(0, currentProfile.value.indexOf("("));
        }
        client.pause(3000);
        client.waitForElementVisible('//*[@class="legend-item" and contains(.,"'+cleanedProfileName+'")]', data.DEFAULT_TIMEOUT);
        return analyze.expect.element('@legendItem').text.to.contain(cleanedProfileName).after(3000);
    })
});

Then(/^I click on "([^"]*)" from the list$/, async function (item) {
    await helper.waitForElement('//div[@class=\'ui-graph ember-view\']//li[normalize-space(.)=\'' + item + '\']');
    await client.useXpath().click('//div[@class=\'ui-graph ember-view\']//li[normalize-space(.)=\'' + item + '\']');

});


Then(/^I click on 'OK' button on the alert$/, async function () {
    await helper.waitForElement('//div[@class=\'modal-dialog modal-sm\']//button[normalize-space(.) = \'OK\']');
    await client.useXpath().click('//div[@class=\'modal-dialog modal-sm\']//button[normalize-space(.) = \'OK\']');

});

Then(/^I should see NEO Messaging pane$/, async function () {
    await analyze.expect.element('@neoMessagingPane').to.be.visible.before(data.DEFAULT_TIMEOUT);
});

Then(/^I should see Soundbyte Performance pane$/, async function () {
    await analyze.expect.element('@soundbytePerformancePane').to.be.visible.before(data.DEFAULT_TIMEOUT);
});

Then(/^I click on three dots$/, async function () {
    await client.pause(3000);
    await client.useXpath().waitForElementVisible('//div[@class=\'ui-three-dots ember-view\']', 3000);
    await client.useXpath().click('//div[@class=\'ui-three-dots ember-view\']');

});

Then(/^I click on 'Clear Search and Filter' from the list$/, async function () {
    await helper.waitForElement('//li[normalize-space(.)=\'Clear Search and Filter\']');
    await client.useXpath().click('//li[normalize-space(.)=\'Clear Search and Filter\']');
});


Then(/^I click on "([^"]*)" toggle$/, async function (toggleTitle) {
    await helper.waitForElement('//*[@class=\'ui-accordion-title \' and normalize-space(.)=\'' + toggleTitle + '\']');
    await client.useXpath().click('//*[@class=\'ui-accordion-title \' and normalize-space(.)=\'' + toggleTitle + '\']');
});

Then(/^I should see "([^"]*)" label$/, async function (dropdownLabel) {
    await helper.waitForElement('//label[normalize-space(.)=\'' + dropdownLabel + '\']');
    await client.useXpath().expect.element('//label[normalize-space(.)=\'' + dropdownLabel + '\']').to.be.visible.before(data.DEFAULT_TIMEOUT);
});

Then(/^I select "([^"]*)" from "([^"]*)" drop\-down$/, async function (dropdownItem, dropdownLabel) {
    await helper.waitForElement('//label[normalize-space(.)=\'' + dropdownLabel + '\']/following-sibling::div//span[2]');
    await client.useXpath().click('//label[normalize-space(.)=\'' + dropdownLabel + '\']/following-sibling::div//span[2]');
    await helper.waitForElement('//*[@role=\'listbox\']//li[normalize-space(.)=\'' + dropdownItem + '\']');
    await client.useXpath().click('//*[@role=\'listbox\']//li[normalize-space(.)=\'' + dropdownItem + '\']');
});

Then(/^Time selector drop\-down visible$/, async function () {
    await client.useXpath().expect.element('//*[@class=\'customize-graph ember-view\']//div[4]/div[2]').to.be.visible.before(data.DEFAULT_TIMEOUT);
});

Then(/^I select "([^"]*)" from time selector drop\\\-down$/, async function (timeframe) {
    await helper.waitForElement('//label[normalize-space(.)=\'by\']/../../following-sibling::*/div/div//span[2]');
    await client.useXpath().click('//label[normalize-space(.)=\'by\']/../../following-sibling::*/div/div//span[2]');
    await helper.waitForElement('//*[@role=\'listbox\']//li[normalize-space(.)=\'' + timeframe + '\']');
    await client.useXpath().click('//*[@role=\'listbox\']//li[normalize-space(.)=\'' + timeframe + '\']');

});
Then(/^I select a competitor from Competitor drop\\\-down$/, async function () {
    await helper.waitForElement('//label[normalize-space(.)=\'Compare\']/../../following-sibling::div//ul/following-sibling::span');
    await client.useXpath().click('//label[normalize-space(.)=\'Compare\']/../../following-sibling::div//ul/following-sibling::span');
    await helper.waitForElement('//*[@role=\'listbox\']//li[1]');
    await client.useXpath().click('//*[@role=\'listbox\']//li[1]');
    await client.waitForElementVisible('//label[normalize-space(.)="Compare"]/../../following-sibling::div//ul/li[contains(normalize-space(),"AllClear ID")]',data.DEFAULT_TIMEOUT);
});
Then(/^The tile header changes to "([^"]*)"$/, async function (header) {
    await analyze.waitForElementVisible('@tileHeader',data.DEFAULT_TIMEOUT);
    await analyze.expect.element('@tileHeader').text.to.contain(header).after(3000);
});

Then(/^I see that the articles are filtered accordingly$/, async function () {
    await client.assert.ok(oldArticleCount != newArticleCount || oldArticleCount == newArticleCount);
});


Then(/^New legend "([^"]*)" is added to the tile$/, async function (legend) {
    var flag = false;
    await helper.waitForElement('.legend-item');
    await client.elements('css selector', '.legend-item', async function (result) {
        console.log('Number of legends   ' + result.value.length)
        for (var i = 0; i < result.value.length; i++) {
            if (result.value.startsWith(legend)) {
                flag = true;
            }
        }
        await client.assert.ok(flag);
    });
});


Then(/^"([^"]*)" axis label becomes "([^"]*)"$/, async function (axis, label) {
    if (axis === "X") {
        await analyze.expect.element('@xAxisLabel').text.to.contain(label).after(3000);
    }
    if (axis === "Y") {
        await analyze.expect.element('@yAxisLabel').text.to.contain(label).after(3000);
    }

});


Then(/^Article list profile selector is added with new profile "([^"]*)"$/, async function (newProfile) {
    await analyze.expect.element('@articleListProfileSelector').text.to.contain(newProfile);
});

Then(/^I click on close extended articles button$/, async function () {
    await analyze.click('@closeExtendedArticles');
});

Then(/^I click on three dots in article list$/, async function () {
    await analyze.click('@threeDotsArticleList');
});
Then(/^drop-down menu is visible$/, async function () {
    await analyze.waitForElementVisible('@optionsDropdownArticleList',data.DEFAULT_TIMEOUT);
    await analyze.expect.element('@optionsDropdownArticleList').to.be.visible;
});

Then(/^I click on "([^"]*)" from article list options drop-down$/, async function (menuItem) {
    await helper.waitForElement('//div[@class="article-list-card ember-view"]//li[normalize-space()=\'' + menuItem + '\']');
    await client.useXpath().click('//div[@class="article-list-card ember-view"]//li[normalize-space()=\'' + menuItem + '\']');
});

Then(/^I select "([^"]*)" from the analyze dropdown$/, async function (menuItem) {
    await analyze.waitForElementVisible('@analyzeDropdown',data.DEFAULT_TIMEOUT);
    await analyze.click('@analyzeDropdown');
    await helper.waitForElement('//li[normalize-space()=\'' + menuItem + '\']');
    await client.useXpath().click('//li[normalize-space()=\'' + menuItem + '\']');
});

Then(/^Articles are sorted by "([^"]*)"$/, async function (menuItem) {
    await client.useXpath().expect.element('//*[@class="article-sort-dropdown ember-view"]/div/div').text.to.contain(menuItem).before(data.DEFAULT_TIMEOUT);
});

Then(/^I should see page header as "([^"]*)"$/, async function (header) {
    await analyze.expect.element('@analyzeHeader').text.to.contain(header).before(data.DEFAULT_TIMEOUT);
});

Then(/^Article list title contains "([^"]*)"$/, async function (titleText) {
    await analyze.expect.element('@articleListHeader').text.to.contain(titleText).before(data.DEFAULT_TIMEOUT);
});

Then(/^There are articles loaded into Article List view$/, async function () {
    await client.elements('css selector', '.article-list div', async function (result) {
        console.log('Number of articles ' + result.value.length)
        await client.assert.ok(result.value.length > 0);
    });
});

Then(/^I select first article from the list$/, async function () {
    await client.useXpath().waitForElementVisible('//div[@class="article-list ember-view"]/div[1]',data.DEFAULT_TIMEOUT);
    await client.useXpath().click('//div[@class="article-list ember-view"]/div[1]');
});

Then(/^I should see Search and Filter sidebar$/, async function () {
    await analyze.waitForElementVisible('@searchAndFilterTitle',data.DEFAULT_TIMEOUT);
    await analyze.expect.element('@searchAndFilterTitle').to.be.visible.before(data.DEFAULT_TIMEOUT)
});

Then(/^I check 'Group by publication' checkbox$/, async function () {
    await helper.waitForElement( '//label[normalize-space()="Group by publications"]/input');
    await client.element('xpath', '//label[normalize-space()="Group by publications"]/input', function (result) {
        client.elementIdSelected(result.value.ELEMENT, function (element) {

            client.useXpath().click('//label[normalize-space()="Group by publications"]/input');
            client.pause(2000);
            //double check if it already checked
            if (element.value) {
                client.useXpath().click('//label[normalize-space()="Group by publications"]/input');
            }

        });

    });
});

Then(/^I uncheck 'Group by publication' checkbox$/, async function () {
    await helper.waitForElement('//label[normalize-space()="Group by publications"]/input');
    await client.element('xpath', '//label[normalize-space()="Group by publications"]/input', function (result) {
        client.elementIdSelected(result.value.ELEMENT, function (element) {
            if (element.value) {
                client.useXpath().click('//label[normalize-space()="Group by publications"]/input');
            }

        });

    });
});

Then(/^I enter following keywords into "([^"]*)" textbox$/, function (inputLabel, data) {
    oldArticleCount = newArticleCount;
    analyze.getText("@articleListHeader", function (text) {
        return newArticleCount = text.value.slice(text.value.indexOf('('), text.value.indexOf(')'));
    });
    return data.raw().forEach(function (element) {
        console.log(element[0]);
        client
            .useXpath()
            .click('//label[normalize-space()="' + inputLabel + '"]/following-sibling::input');
        return client
            .useXpath().setValue('//label[normalize-space()="' + inputLabel + '"]/following-sibling::input', element[0] + ", ");
    });
});

Then(/^I select "([^"]*)" as Filter$/, function (option) {
    oldArticleCount = newArticleCount;
    return analyze.getText("@articleListHeader", function (text) {
        newArticleCount = text.value.slice(text.value.indexOf("("), text.value.indexOf(")"));
    })
    return client.useXpath().click('//label[normalize-space()="' + option + '"]/input');
});


Then(/^'Set Brand Sentiment' button is displayed$/, async function () {
    await helper.waitForElement('//div[@class=\'airpr-popover ember-view\']//div[ normalize-space()=\'Set Brand Sentiment\']');
    await client.useXpath().expect.element('//div[@class=\'airpr-popover ember-view\']//div[ normalize-space()=\'Set Brand Sentiment\']').to.be.visible.before(data.DEFAULT_TIMEOUT);
});

Then(/^Article is opened in extended view$/, async function () {
    await analyze.waitForElementVisible('@articleListContainer', data.DEFAULT_TIMEOUT);
    await analyze.expect.element('@articleListSummaryTab').to.be.visible.after(1000);
    await analyze.expect.element('@articleListStatisticsTab').to.be.visible;
    // await analyze.expect.element('@articleListBradSentimentTab').to.be.visible;
    //TODO 4th tab visible for syndicates only
});


Then(/^first "([^"]*)" articles are selected from the list$/, async function (numberOfArticles) {
    await helper.waitForElement('.checked');
    await client.elements('css selector', '.checked', async function (result) {
        console.log('Number of articles ' + result.value.length);
        await client.assert.ok(result.value.length === numberOfArticles);
    });
});

Then(/^All the articles are deselected$/, async function () {
    await client.elements('css selector', '.checked', async function (result) {
        console.log('Number of selected articles ' + result.value.length);
        await client.assert.ok(result.value.length == 0);
    });
});

Then(/^I name the search criteria as "([^"]*)"$/, async function (filterName) {
    await analyze.waitForElementVisible('@searchFilterName',data.DEFAULT_TIMEOUT);
    await analyze.setValue('@searchFilterName', filterName);
});


Then(/^I set the filter as "([^"]*)"$/, async function (option) {
    await helper.waitForElement('//label[contains(.,"' + option + '")]/input');
    await client.useXpath().click('//label[contains(.,"' + option + '")]/input');
});

Then(/^Confirmation alert pops-up and contains confirmation text as "([^"]*)"$/, async function (text) {
    await analyze.waitForElementVisible('@confirmationPopUp', data.DEFAULT_TIMEOUT);
    await analyze.expect.element('@confirmationPopUp').text.to.contain(text);
});

Then(/^Heading should contains "([^"]*)"$/,async function(headerText){
    await client
                .useXpath()
                .waitForElementVisible('//span[contains(.,"'+headerText+'")]',data.SHORT_DELAY)
                .expect.element('//span[contains(.,"'+headerText+'")]').to.be.visible;
});