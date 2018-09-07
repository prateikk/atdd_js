const {Given, When, Then} = require('cucumber');
const {client} = require('nightwatch-cucumber');
const dashboard = client.page.dashboardPage();
const analyze = client.page.analyze();

var helper = require('../../utils/helpers');
var data = require('../../config/login');
var newSandF;
var tileName;

    Then(/^I should see profile selector on screen$/, async function () {
        await dashboard.expect.element('@profileContainer').text.to.contain('PROFILE');
    });

    Then(/^I should see campaign selector on screen$/, async function () {
        await dashboard.expect.element('@campaignContainer').text.to.contain('CAMPAIGN');
    });

    Then(/^I should be able to clear the campaign$/, async function () {
        await dashboard.waitForElementVisible('@clearCampaign',data.DEFAULT_TIMEOUT);
        await dashboard.click('@clearCampaign');
    });

    Then(/^I should see 'All Data' as default on campaign selector$/, async function () {
        await dashboard.expect.element('@campaignContainer').text.to.contain('All Data');
    });

    Then(/^I click on profile selector drop-down$/, async function () {
        await dashboard.waitForElementVisible('@profileDropdown',data.DEFAULT_TIMEOUT);
        await dashboard.click('@profileDropdown');
    });

    Then(/^I click on campaign selector drop-down$/, async function () {
        await dashboard.waitForElementVisible('@campaignDropdown',data.DEFAULT_TIMEOUT);
        await dashboard.click('@campaignDropdown');
    });

    Then(/^I click on 'Revert to Widget Defaults' from the list$/, async function () {
        await dashboard.waitForElementVisible('@revertToWidgetDefaults',data.DEFAULT_TIMEOUT);
        await dashboard.click('@revertToWidgetDefaults');
    });


    Then(/^I click on Search and Filter selector drop-down$/, async function () {
        await dashboard.waitForElementVisible('@searchAndFilterContainer',data.DEFAULT_TIMEOUT);
        await dashboard.click('@searchAndFilterContainer');
    });

    Then(/^I should see 'Campaign Filters' is applied to Search & Filter$/, async function () {
        await helper.waitForElement('//*[@class="nav-dropdown-selection" and contains(.,"Campaign Filters")]');
        await dashboard.expect.element('@searchAndFilterContainer').text.to.contain('Campaign Filters');
    });


    Then(/^I should see campaign legend is applied to Dashboard tiles$/, async function () {
        return dashboard.getText('@campaignDropdown', function (currentCampaign) {

            console.log(currentCampaign.value);
            helper.waitForElement('//*[@class="legend-item" and contains(.,"'+currentCampaign.value+'")]');
            dashboard.expect.element('@legendItem_1').text.to.contain(currentCampaign.value).after(3000);
            return client.pause(1000);
        })
    });

    Then(/^I should see profile legend is applied to Dashboard tiles$/, async function () {
        await dashboard.waitForElementVisible('@profileDropdown',data.DEFAULT_TIMEOUT);
        return dashboard.getText('@profileDropdown', function (currentProfile) {
            var cleanedProfileName= currentProfile.value;
            if (currentProfile.value.includes("(")){
                cleanedProfileName = currentProfile.value.slice(0,currentProfile.value.indexOf("("));
            }
            client.pause(3000);
            dashboard.waitForElementVisible('@legendItem_1', data.DEFAULT_TIMEOUT);
            return dashboard.expect.element('@legendItem_1').text.to.contain(cleanedProfileName.trim()).after(3000);
            //client.pause(1000)
        })
    });


    Then(/^I should see Search and Filter selector drop-down changed to "([^"]*)"$/, async function (visibleSearchText) {
        await dashboard.waitForElementVisible('@searchAndFilterContainer',data.DEFAULT_TIMEOUT);
        await dashboard.expect.element('@searchAndFilterContainer').text.to.contain(visibleSearchText).before(data.DEFAULT_TIMEOUT);
    });

    Then(/^I should be able to select a different profile from drop\-down$/, async function () {
        //var originalProfile
        var newProfile
        var i = 1
        dashboard.waitForElementVisible('@dropdownMenu', 2000)
        return dashboard.getText('@profileDropdown', function (originalProfile) {
            console.log('originalProfile ' + originalProfile.value)

            return client.useCss().getText('.breadcrumbs .profile-selector li:nth-of-type(' + i + ')', function (result) {
                client.pause(1000)
                newProfile = result.value;
                console.log('#### ' + newProfile)
                if (newProfile.toString().startsWith(originalProfile.value)) {
                    i++;
                }
                return client.getText('.breadcrumbs .profile-selector li:nth-of-type(' + i + ')', function (result) {

                    console.log('Clicking on ' + result.value)
                    dashboard.click('.breadcrumbs .profile-selector li:nth-of-type(' + i + ')')
                    client.pause(1000)
                    return dashboard.expect.element('@profileDropdown').text.to.contain(result.value).before(10000);
                })


            })
        })
    });
    Then(/^I select "([^"]*)" profile from drop-down$/, async function (profileName) {
        await dashboard.waitForElementVisible('@profileDropdown',data.DEFAULT_TIMEOUT);
        await dashboard.click('@profileDropdown');
        await console.log('Selecting Profile: ' + profileName);
        await client.useXpath().click('//*[contains(@class,"profile-selector")]//ul//li[contains(.,"'+profileName+'")]');
        await helper.waitForElement('//*[@class="nav-dropdown-selection" and contains(.,"'+profileName+'")]');
    });

    Then(/^I should be able to select a different campaign from drop\-down$/, async function () {
        //var originalcampaign
        var newcampaign
        var i = 1
        dashboard.waitForElementVisible('@campaignDropdownMenu', data.DEFAULT_TIMEOUT)
        return dashboard.getText('@campaignDropdown', function (originalcampaign) {
            console.log('originalCampaign ' + originalcampaign.value)

            return client.useCss().getText('.breadcrumbs .profile-selector + span li:nth-of-type(' + i + ')', function (result) {
                newcampaign = result.value;

                if (newcampaign.toString().startsWith(originalcampaign.value) || newcampaign.toString().startsWith('Clear campaign')) {
                    i++;
                }
                return client.getText('.breadcrumbs .profile-selector + span li:nth-of-type(' + i + ')', function (result_2) {
                    var campaign = result_2.value;
                    dashboard.click('.breadcrumbs .profile-selector + span li:nth-of-type(' + i + ')');
                    dashboard.waitForElementVisible('@campaignContainer',data.DEFAULT_TIMEOUT);
                    return dashboard.expect.element('@campaignContainer').text.to.contain(campaign);
                })

            })
        })
    });


    Then(/^I should be able to select a search and filter keywords from drop\-down$/, async function () {
        //var originalcampaign
        var newSF;
        var i = 1;
        dashboard.waitForElementVisible('@searchAndFilterDropdownMenu', 2000)
        return dashboard.getText('@searchAndFilterDropdown', function (currentSF) {
            console.log('currentSF ' + currentSF.value);

            return client.useCss().getText('.breadcrumbs .saved-filter-dropdown li:nth-of-type(' + i + ')', function (result) {
                newSF = result.value;
                console.log('#### ' + newSF);
                if (newSF.toString().startsWith(currentSF.value)) {
                    i++;
                }
                dashboard.click('.breadcrumbs .saved-filter-dropdown li:nth-of-type(' + i + ')');
                client.pause(1000)
                newSandF = newSF;
                return dashboard.expect.element('@searchAndFilterDropdown').text.to.contain(newSF);
            })


        })
    });


    Then(/^I should see search and filter is applied to Dashboard tiles$/, async function () {
        var tileSelector = '//*[contains(@class,"ui-card-header")]';
        console.log('New Search and Filter: ' + newSandF);
        await helper.waitForElement('//*[@class="ui-card-header card-header ember-view" and contains(normalize-space(),"'+newSandF+'")]');
        await client.useXpath().expect.element(tileSelector).text.to.contain(titleCase(newSandF)).after(2000);
    });

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    Then(/^I click on Reset search & filters link text$/, async function () {
        await dashboard.waitForElementVisible('@searchAndFilterMessage',data.DEFAULT_TIMEOUT);
        await dashboard.expect.element('@searchAndFilterMessage').text.to.contain(newSandF);
        await dashboard.click('@resetSFLink');
    });


    Then(/^I expand "([^"]*)" section$/, async function (section) {
        await dashboard.expect.element('@sidebar').to.be.visible.before(data.DEFAULT_TIMEOUT);
        await dashboard.waitForElementVisible('@coverageSection',data.DEFAULT_TIMEOUT);
        await dashboard.click('@coverageSection');
    });

    Then(/^I drag the this tile to the Dashboard tile area "([^"]*)"$/, async function (question) {

        var source = '//div[@class=\'ui-sidebar ember-view\']//div[@class=\'ui-question-block-text\'][contains(text(),\'' + question + '\')]';
        await helper.waitForElement(source);
        await client.useXpath().moveToElement(source,5,5);
        await client.doubleClick();
        // var destination;
        // await client
        //     .element('xpath', '//div[@class=\'ui-empty-card ember-view\']', async function (result) {
        //         if (result.value && result.value.ELEMENT) {
        //             destination = '//div[@class=\'ui-card card ember-view\']';
        //         } else {
        //             destination = '//div[@class="dashboard-cards-container ember-view"]//div[@class="card-container"][1]';
        //         }
        //     })
        // await helper.moveMouse(source, destination);
        
        // await client
        //     .moveToElement(source, 10, 10);
        // await client
        //     .mouseButtonDown(0);
        // await client
        //     .pause(3000);
        // await client
        //     .moveToElement(destination, 10, 10);
        // await client
        //     .mouseButtonUp(0)
        //     .pause(5000)  // Keep browser open for 5 seconds so you can see result


    });

    Then(/^I should see a new tile "([^"]*)" added to Dashboard$/, async function (tileHeader) {
        var tileSelector = '//*[contains(@class,"ui-card-header") and contains(.,"'+tileHeader+'")]';
        await helper.waitForElement(tileSelector);
        await client.useXpath().expect.element(tileSelector).to.be.visible.after(data.SHORT_DELAY);
    });

    Then(/^I click on "([^"]*)" tile$/, async function (tile) {
        tileName = tile;
        var tileSelector = '//*[contains(@class,"ui-card-header") and contains(.,"'+tile+'")]';
        await client.useXpath().assert.elementPresent(tileSelector);
        await client.useXpath().expect.element(tileSelector).to.be.visible.before(data.DEFAULT_TIMEOUT);
        var tileBody = tileSelector+'/following-sibling::div';
        await client.useXpath().click(tileBody);
        await client.pause(5000);
        await console.log('Clicked the tile ' + tileName);
    });

    Then(/^Tile is opened in Analyze/, async function () {
        await client.assert.title('Coverage - Analyze - AirPR Analyst');
        await analyze.expect.element('@analyzeHeader').text.to.contain('Analyze');
        await analyze.expect.element('@analyzeHeader').text.to.contain('Coverage');

    });

    Then(/^I clear the dashboard tiles/, function () {
        client.pause(3000);
        return client.element('css selector', '.ui-three-dots', function (visible) {
            if (visible.status === -1) { // is not visible
                console.log('No tiles to clear');
            } else {

                client.useXpath().waitForElementVisible('//div[@class=\'card-container\'][1]//div[@class=\'ui-three-dots ember-view\']', 3000);
            return client.elements('css selector', '.ui-three-dots div[role=\'button\']', function (result) {
                    console.log('result.value.length   ' + result.value.length)
                    for (var i = 0; i < result.value.length; i++) {
                        client
                            .useXpath()
                            .click('//div[@class=\'card-container\'][1]//div[@class=\'ui-three-dots ember-view\']')
                            .click('//a[contains(text(),\'Remove from dashboard\')]')
                            .pause(500)
                            .click('//button[normalize-space(.) = \'Delete\']')
                            .pause(1000);

                    }
                    return client;
                });
            }
        });

    });
