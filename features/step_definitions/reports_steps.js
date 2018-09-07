const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
const report = client.page.report();
var data = require('../../config/login');
var helper = require('../../utils/helpers');
var originalNumReportPages = 0;
var checkboxPropertyies= {};

var isShareReportWindow = false;

async function waitForElement(xpath) {
    await client.useXpath().waitForElementVisible(xpath, data.DEFAULT_TIMEOUT);
}

Then(/^I see the page header as "([^"]*)"$/, async function (pageTitle) {
    await helper.waitForElement('//h1[contains(normalize-space(),"'+pageTitle+'")]');
    await report.expect.element('@reportsHeader').text.to.contain(pageTitle);
});

Then(/^I see the page header as "([^"]*)" in the report$/, async function (pageTitle) {

    // @reportsHeader directly here does not work sometimes
    await client.useCss().waitForElementVisible('.report-content .report-title-last-text', data.DEFAULT_TIMEOUT);

    await report.expect.element('.report-content .report-title-last-text').text.to.contain(pageTitle);
});

Given(/^I click on "([^"]*)" button on report screen$/, async function (buttonName) {
    var selector = '//*[contains(@class, "btn") and contains(.,"' + buttonName + '")]';
    await client
        .useXpath()
        .waitForElementVisible(selector, data.DEFAULT_TIMEOUT)
        .click(selector);
});

Then(/^I should see 'Create a New Report' dialog$/, async function () {
    await report.waitForElementVisible('@newReportDialog',data.DEFAULT_TIMEOUT);
    await report.expect.element('@newReportDialog').to.be.visible.before(data.DEFAULT_TIMEOUT);
});

Then(/^I set report name as "([^"]*)"$/, async function (reportName) {
    await report.setValue('@reportName', reportName);
});

Then(/^I set profile as "([^"]*)"$/, async function (profileName) {
    await report.click('@newReportProfileSelector');
    await report.setValue('@profileSearch', profileName)
    await client.useXpath().click('//*[contains(@class,"profile-chooser")]/div[@class="ember-view"]');
});

Then(/^I set date range as "([^"]*)"$/, async function (range) {
    await report.waitForElementVisible('@dateSelector',data.DEFAULT_TIMEOUT);
    await report.click('@dateSelector');
    await helper.waitForElement('//ul[@class="ui-quick-ranges ember-view"]//li/a[contains(text(),"' + range + '")]');
    await client.useXpath().click('//ul[@class="ui-quick-ranges ember-view"]//li/a[contains(text(),"' + range + '")]');
});

Then(/^I click "([^"]*)" button on create new report screen$/, async function (buttonName) {
    await client.useXpath().click('//div[@class="report-create-form"]//div[contains(text(),"' + buttonName + '")]');
    await report.waitForElementNotPresent('@newReportDialog', data.DEFAULT_TIMEOUT);
});

Then(/^Title page is displayed$/, async function () {
    if (isShareReportWindow) {
        await client.windowHandles(function (result) {
            var handle = result.value[1];
            client.switchWindow(handle)
        });

    } else {
        await report.expect.element('@titlePage').to.be.visible.before(data.DEFAULT_TIMEOUT);
        await client.elements('css selector', '.report-pages .report-page', async function (result) {
            originalNumReportPages = result.value.length;
        })
    }
});

Then(/^There are "([^"]*)" report pages by default$/, function (numberOfPages) {
    if (isShareReportWindow) {
        return client.elements('css selector', 'ul.report-share-pages li', function (result) {
            console.log(result.value.length + '::::::::::::::::::::' + typeof result.value.length);
            return client.assert.ok(result.value.length === parseInt(numberOfPages));
        });
    } else {
        return client.elements('css selector', 'ul.report-pages div[data-page]', function (result) {
            return client.assert.ok(result.value.length === parseInt(numberOfPages));
        });
    }
});

Then(/^Report title on the tile is "([^"]*)"$/, async function (reportTitle) {
    await report
        .waitForElementVisible('@reportContentTitle', data.DEFAULT_TIMEOUT)
        .expect.element('@reportContentTitle').text.to.contain(reportTitle);
});

Then(/^Report duration is displayed on the title tile$/, async function () {
    await report.expect.element('@reportContentDateRange').to.be.visible;
    //after new tab close again coming at current window
    if (isShareReportWindow) {
        isShareReportWindow = false;
        client.closeWindow();
        await client.windowHandles(function (result) {
            var handle = result.value[0];
            client.switchWindow(handle)
        });
    }
    await report.expect.element('@titlePage').to.be.visible.before(data.DEFAULT_TIMEOUT);
});

Then(/^I go to report page "([^"]*)"$/, async function (pageNumber) {
    await client.keys(client.Keys.ESCAPE).pause(data.SHORT_DELAY);
    var selector = `//div[@data-page='${pageNumber}']`;
    await client.useXpath().waitForElementVisible(selector, data.DEFAULT_TIMEOUT);
    await client.expect.element(selector).to.be.visible;
    await client.click(selector);
});

Then(/^I select "([^"]*)" from report component options$/, async function (option) {
    switch (option.toLowerCase()) {
        case "charts":
            await report.click('@option_charts');
            break;

        case "articles":
            await report.click('@option_articles');
            break;

        case "tiles":
            await report.click('@option_tiles');
            break;

        case "texts":
            await report.click('@option_texts');
            break;

        case "images":
            await report.click('@option_images');
            break;

        default:
            console.log("Invalid component option");
            break;
    }
});


Then(/^I drag "([^"]*)" chart to the report$/, async function (option) {
    switch (option.toLowerCase()) {
        case "line":
            await helper.pullComponent("Line");
            break;

        case "column":
            await helper.pullComponent("Column");
            break;

        case "grouped column":
            await helper.pullComponent("Grouped Column");
            break;

        case "stacked column":
            await helper.pullComponent("Stacked Column");
            break;

        case "bar":
            await helper.pullComponent("Bar");
            break;

        case "donut":
            await helper.pullComponent("Donut");
            break;

        case "pie":
            await helper.pullComponent("Pie");
            break;

        case "articles":
            await helper.pullComponent("Articles");
            break;

        case "coverage":
            await helper.pullComponent("Coverage");
            break;

        default:
            console.log("Invalid component option");
            break;
    }
});


Then(/^"([^"]*)" chart is available in the report content$/, async function (chartType) {
    await client.elements('css selector', '.report-content .grid-item', async function (result) {
        //length will be 2 because of a hidden grid item
        await client.assert.ok(result.value.length == 2, 'No tile added to the report');
    })
});

Then(/^I open the report named "([^"]*)"$/, async function (reportName) {
    await helper.waitForElement('//h4[@class="report-title" and contains(.,"' + reportName + '")]/parent::div/parent::header/following-sibling::div');
    await client.useXpath().click('//h4[@class="report-title" and contains(.,"' + reportName + '")]/parent::div/parent::header/following-sibling::div');
    //remove the following when ANL-4235 is fixed
    // await report.click('@extendedReportPage');
    await helper.waitForElement('.report-content .powered-by');
    await client
        .useCss()
        .moveToElement('.report-content .powered-by', 10, 10)
        .mouseButtonClick(0)
});


Then(/^A page is added to the report$/, async function () {
    await client.elements('css selector', '.report-pages .report-page', async function (result) {
        console.log('#Original report pages: ' + originalNumReportPages + ' #New Report pages: ' + result.value.length)
        await client.assert.ok(result.value.length == originalNumReportPages + 1, 'No page added to the report');
        originalNumReportPages = result.value.length;
    })
});


Then(/^I set the widget size as "([^"]*)"$/, async function (reportSize) {
    await report.moveToElement('@reportContentTiles', 10, 10)
    await report.click('@reportSizeDropdown');
    await client.useXpath().click('//*[@class="report-content"]//li[contains(.,"' + reportSize + '")]');
});

Then(/^I select the widget to be deleted$/, async function () {
    await client.useCss()
        .moveToElement('.report-content .grid-item .report-tool-toolbar-destroy', 2, 2)
        .pause(500)
        .click('.report-content .grid-item .report-tool-toolbar-destroy');
});

Then(/^The widget should be deleted$/, async function () {
    await client.elements('css selector', '.report-content .grid-item', async function (result) {
        await client.assert.ok(result.value.length == 1, 'No tile deleted');
    })
});

Then(/^I open options dropdown for "([^"]*)"$/, async function (reportTitle) {
    await client.useXpath().click('//*[@class="report-title" and contains(.,"' + reportTitle + '")]/following-sibling::*//div[@class="ui-three-dots ember-view"]');
});

Then(/^I click on "([^"]*)" option$/, async function (reportOption) {
    await helper.waitForElement('//a[contains(.,"' + reportOption + '")]');
    await client.click('//a[contains(.,"' + reportOption + '")]');
});


Then(/^'Edit Report' pop-up is visible$/, async function () {
    await report.expect.element('@editReportPopup').to.be.visible.before(data.DEFAULT_TIMEOUT);
});


Then(/^I click on "([^"]*)" button on edit report pop-up$/, async function (buttonText) {
    await client
        .waitForElementVisible('//div[@class="report-edit-form"]//div/div/div[contains(.,"' + buttonText + '")]', data.DEFAULT_TIMEOUT)
        .click('//div[@class="report-edit-form"]//div/div/div[contains(.,"' + buttonText + '")]');
    console.log('clicked ' + buttonText + ' button')
});

Then(/^I click on "([^"]*)" button on the pop-up$/, async function (buttonText) {
    await helper.waitForElement('//*[@class="modal-content"]//button[normalize-space(.) = "' + buttonText + '"]');
    await client.useXpath().click('//*[@class="modal-content"]//button[normalize-space(.) = "' + buttonText + '"]');
});


Then(/^I see that the "([^"]*)" report is now "([^"]*)"$/, async function (reportTitle, reportPrivacy) {
    var selector = '//*[@class="report-title" and contains(.,"' + reportTitle + '")]/parent::div/following-sibling::div/div/i';
    if (reportPrivacy === "Public") {
        await client.useXpath().assert.attributeContains(selector, 'class', 'fa-users');
    } else {
        await client.useXpath().assert.attributeContains(selector, 'class', 'fa-user');
    }
});

Then(/^Information pop-up is visible and has text "([^"]*)"$/, async function (infoText) {
    await report.waitForElementVisible('@informationPopup',data.DEFAULT_TIMEOUT);
    await report.expect.element('@informationPopup').to.be.visible.before(data.SHORT_DELAY);
    await report.expect.element('@informationPopup').text.to.contain(infoText);
    await helper.waitForElement('//*[@class="modal-content"]//button[normalize-space(.) = "OK"]');
    await client.useXpath().click('//*[@class="modal-content"]//button[normalize-space(.) = "OK"]');
});

Then(/^Confirmation pop-up is visible and has text "([^"]*)"$/, async function (infoText) {
    await report.expect.element('@informationPopup').to.be.present.before(data.SHORT_DELAY);
    await report.expect.element('@informationPopup').to.be.visible.before(data.SHORT_DELAY);
    await report.expect.element('@informationPopup').text.to.contain(infoText);
});

Then(/^New report with name "([^"]*)" is added$/, async function (clonedReportTitle) {
    await client.useXpath()
        .waitForElementVisible('//h4[contains(.,"Copy of Acceptance Report")]', data.DEFAULT_TIMEOUT);
    // .expect.element('//h4[contains(.,"Copy of Acceptance Report")]').to.be.visible;
});

Then(/^"([^"]*)" is deleted from the reports dashboard$/, async function (reportName) {
    await client.useXpath().expect.element('//*[@class="report-title" and contains(.,"' + reportName + '")]').to.not.be.present.before(data.DEFAULT_TIMEOUT);
});

Then(/^I put "([^"]*)" in the report search box$/, async function (reportName) {
    await report.setValue('@reportSearchBox', reportName);
});

Then(/^I should see the report loaded matching "([^"]*)"$/, async function (reportName) {
    var selector = '//*[@class="report-title" and contains(.,"' + reportName + '")]';
    await helper.waitForElement(selector);
    await client.useXpath().assert.elementPresent(selector);
    await client.useXpath().expect.element(selector).to.be.visible;
});


Then(/^I click on "([^"]*)" button of "([^"]*)"$/, async function (buttonText, typeOfReport) {
    await client.waitForElementVisible('//h4[text()="' + typeOfReport + '"]/parent::div/div/div[contains(.,"' + buttonText + '")]', data.DEFAULT_TIMEOUT);
    await client.click('//h4[text()="' + typeOfReport + '"]/parent::div/div/div[contains(.,"' + buttonText + '")]');
    console.log('clicked ' + buttonText + ' button')
});

Then(/^I see the page header as MONTHLY REPORT$/, async function () {
    await client
        .useXpath()
        .waitForElementVisible('//h1[contains(.,"MONTHLY REPORT")]', data.DEFAULT_TIMEOUT);

    await client
        .useXpath()
        .expect.element('//h1[contains(.,"MONTHLY REPORT")]').to.be.visible;
});


Then(/^I click on 'Download Report' icon$/, async function () {
    await client
        .useXpath()
        .click('//*[@class="report-nav report-nav-right ml-auto"]/div[2]');
});


Then(/^I should see "([^"]*)" pop-up$/, async function (popUpHeader) {
    let headerType = '3';
    if (popUpHeader === 'Monthly Report Preview') {
        headerType = '2';
        popUpHeader = popUpHeader.substring(0, 14);
    }
    await client
        .useXpath()
        .waitForElementVisible('//*[@class="modal-panel-pane"]/h' + headerType + '[text()="' + popUpHeader + '"]', data.DEFAULT_TIMEOUT);
    await client
        .useXpath()
        .expect.element('//*[@class="modal-panel-pane"]/h' + headerType + '[text()="' + popUpHeader + '"]').to.be.visible;

});

Then(/^I close the pop-up$/, async function () {
    await report.click('@previewClose');
});

Then(/^I click on 'Share' tile$/, async function () {
    await client
        .useXpath()
        .click('//*[@class="download-actions_share"]');

});

Then(/^I check 'Make this report accessible' checkbox$/, async function () {
    if (!client.element('xpath', '//label[contains(.,"Make this report accessible")]/input[@checked]')) {
        await client.useXpath().click('//label[contains(.,"Make this report accessible")]/input');
    }

});


Then(/^I click on Preview it 'here' link$/, async function () {
    await helper.waitForElement('//a[text()="here"]');
    await client
        .useXpath()
        .click('//a[text()="here"]');
    isShareReportWindow = true;
});

Then(/^There are 24 report pages by default$/, function () {

    return client.elements('css selector', 'div.report-content ul.report-share-pages li', function (result) {
        console.log(result.value.length);
        return client.assert.ok(result.value.length === 24);
    });
});

Then(/^I select "([^"]*)"$/, async function (param) {
    await client
        .useXpath()
        .click('//*[@class="report-content"]/div/div[@class="grid-item ember-view"]');

});
// Then(/^I click on "([^"]*)" in Edit Mode$/, async function (option) {
//     await waitForElement('//div[@class="panel-group ember-view"]/div[contains(.,"' + option + '")]/following-sibling::div');
//     await client
//         .useXpath()
//         .click('//div[@class="panel-group ember-view"]/div[contains(.,"' + option + '")]/following-sibling::div').pause(5000);
// });

Then(/^I click on "([^"]*)" in Edit Mode$/, async function (option) {
    await waitForElement('//*[contains(@class," panel-title") and contains(.,"' + option + '")]');
    await client
        .useXpath()
        .click('//*[contains(@class," panel-title") and contains(.,"' + option + '")]').pause(5000);
});

Then(/^I set "([^"]*)" as "([^"]*)"$/, async function (label, text) {

    await waitForElement('//label[@class="control-label" and contains(.,"' + label + '")]/following-sibling::input');

    await client
        .useXpath()
        .clearValue('//label[@class="control-label" and contains(.,"' + label + '")]/following-sibling::input');

    await client.setValue('//label[@class="control-label" and contains(.,"' + label + '")]/following-sibling::input', text);

    // await client
    //             .useXpath()
    //             .waitForElementVisible('//div[@class="graph-column graph-viewport ember-view"]//span/g[3]',data.DEFAULT_TIMEOUT);
});

Then(/^I should see "([^"]*)" as "([^"]*)" in Line Chart$/, async function (titleValue, text) {
    var selector = '//div[@class="report-content"]//*[name()="svg"]/*[name()="g" and contains(.,"' + text + '")]';
    await client
        .useXpath()
        .expect.element(selector).to.be.present.after(data.SHORT_DELAY);
    await client
        .useXpath()
        .expect.element(selector).to.be.visible;

});

Then(/^I click on keyword setting$/, async function () {
    await client
        .useXpath()
        .click('//div[@class="panel-body"]/div[contains(.,"Keyword")]');
});

Then(/^I set "([^"]*)" as "([^"]*)" in widget edit options$/, async function (option, value) {
    var selector = '//label[text()="' + option + '"]/following-sibling::input';
    await waitForElement(selector);

    await client
        .useXpath()
        .clearValue(selector);

    await client.setValue(selector, value);
});

Then(/^I see article from "([^"]*)"$/, async function (publicationName) {
    await client.assert.containsText('//div[@class="report-content"]//div[@class="col-12 article-title"]', publicationName);
});

//div[@class="report-content"]//i[@class="icon icon-linkedin"]/following-sibling::span

Then(/^I see amplification count from "([^"]*)"$/, async function (publicationName) {
    let count = new Object();
    await client.useCss()
        .waitForElementVisible('.report-content .amplification:nth-child(2) span', data.DEFAULT_TIMEOUT)
        .getText('.report-content .amplification:nth-child(2) span', function (result) {
            console.log(result.value);
            count.linkedinCount = result.value;
        });

    await client.useCss().getText('.report-content .bd h1', function (result) {
        count.totalCoverageCount = result.value;
    });
    return client.assert.ok(count.totalCoverageCount === count.linkedinCount);
});

Then(/^I click on Article List Options at Article widget$/, async function () {
    await waitForElement('//div[@class="panel-group ember-view"]/div[contains(.,"Article List Options")]');
    await client
        .useXpath()
        .click('//div[@class="panel-group ember-view"]/div[contains(.,"Article List Options")]');
});

Then(/^I see "([^"]*)" by default$/, async function (reportAccessibility) {
    var selector = '//a[contains(text(),"' + reportAccessibility + '")]';
    await client.useXpath().assert.elementPresent(selector);
    await client.useXpath().expect.element(selector).to.be.visible;
    await client.assert.attributeContains(selector, 'class', 'active');
});

Then(/^I see reports created by me and other users$/, async function () {
    var myCount = 0;
    var othersCount = 0;

    await client.elements('css selector', '.report-privacy', function (result) {
        for (var i = 1; i <= result.value.length; i++) {
            client.getText('.report-privacy:nth-of-type(' + i + ')', function (privacy) {
                if (privacy.value == "Analyst UI") {
                    return myCount = myCount + 1;
                } else {
                    return othersCount = othersCount + 1;
                }
            });
        }
        console.log('MC ' + myCount);
        console.log('OC ' + othersCount);
        client.assert.ok(myCount >= 1);
        return client.assert.ok(othersCount >= 1);
    });
});

Then(/^I should see the reports created by me only$/, async function () {
    var myCount = 0;
    var othersCount = 0;

    return client.elements('css selector', '.report-privacy', function (result) {
        for (var i = 1; i <= result.value.length; i++) {
            client.getText('.report-privacy:nth-of-type(' + i + ')', function (privacy) {
                if (privacy.value == "Analyst UI") {
                    return myCount = myCount + 1;
                } else {
                    return othersCount = othersCount + 1;
                }
            });
        }
        client.assert.ok(myCount >= 1);
        return client.assert.ok(othersCount = 0);
    });
});

Then(/^I click on "([^"]*)"$/, async function (reportAccessibility) {
    var selector = '//a[contains(text(),"' + reportAccessibility + '")]';
    await helper.waitForElement(selector);
    await client.useXpath().click(selector);
});


Then(/^I click on 'Search and Filters' at Coverage widget$/, async function () {
    await helper.waitForElement('//a[contains(@class,"panel-title") and contains(.,"Search and Filters")]');
    await client
        .useXpath()
        .click('//a[contains(@class,"panel-title") and contains(.,"Search and Filters")]');
});

Then(/^I click on 'Search and Filters'$/, async function () {
    await waitForElement('//*[contains(@class," panel-title") and contains(.,"Article List Options")]/parent::div');
    await client
        .useXpath()
        .click('//*[contains(@class," panel-title") and contains(.,"Article List Options")]/parent::div');
});

Then(/^I check all the Matrics checkboxes$/, async function () {
    // await waitForElement('.checkbox label input');
    await client.elements('css selector', '.checkbox label input', result => {

        console.log(JSON.stringify(result));

        checkboxPropertyies.length = result.value.length;
        const inputObject = result;
        for (let i = 0; i < checkboxPropertyies.length; i++) {
            client.elementIdAttribute(result.value[i].ELEMENT, 'paramchecked', result => {
                if (result.value === null) {
                    client.elementIdClick(inputObject.value[i].ELEMENT, () => {
                    });
                }
            });
        }
    });
});


Then(/^Selected Matrics should be present in article$/, async function () {
    var numberOfLI = new Object();
    let totalNumberOfLi = 0;

    await client.elements('css selector', '.report-content .article', result => {
        totalNumberOfLi = result.value.length*checkboxPropertyies.length;
        });
    await client.elements('css selector', 'div.report-content ul.pull-right li', result => {
        numberOfLI.rightLI = result.value.length;
        console.log(numberOfLI.rightLI);
    });


    await client.elements('css selector', 'div.report-content ul.pull-left li', resultRight => {
        numberOfLI.leftLI = resultRight.value.length;
        console.log(numberOfLI.leftLI + numberOfLI.rightLI);

        client.assert.ok(totalNumberOfLi === (numberOfLI.rightLI + numberOfLI.leftLI));
    });
});

Then(/^I clear the report search box$/, async function () {
    await report
        .waitForElementVisible('@reportSearchBox', data.DEFAULT_TIMEOUT)
        .clearValue('@reportSearchBox');
});

Then(/^Page footer contains "([^"]*)" campaign$/, async function (campaignName) {
    await client
        .waitForElementVisible('//div[@class="report-content"]//div[@class="pull-left report-footer-dates" and contains(.,"' + campaignName + '")]', data.DEFAULT_TIMEOUT);
    await client.useXpath().assert.elementPresent('//div[@class="report-content"]//div[@class="pull-left report-footer-dates" and contains(.,"' + campaignName + '")]');

});
