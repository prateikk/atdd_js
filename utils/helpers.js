const {
    client
} = require('nightwatch-cucumber');
var data = require('../config//login');

const TIMEOUT = 10000;
module.exports = {

    getText: function (selector) {
        var text = '';
        if (selector.toString().startsWith('//')) {
            client.useXpath().getText(selector, function (result) {
                text = result.value;
            });
        } else {
            client.useCss().getText(selector, function (result) {
                text = result.value;
            });
        }

        return text;
    },

    moveMouse: async function (src, dest) {

        var sourceX;
        var sourceY;
        var destX;
        var destY;

        await client
            .useXpath()
            .waitForElementVisible(src, TIMEOUT);

        await client.getElementSize(src, function (size) {
            sourceX = size.value.width / 2;
            sourceY = size.value.height / 2;

        });

        await client.getElementSize(dest, function (size) {
            destX = size.value.width / 2;
            destY = (size.value.height / 2) - 20;

        });

        await console.log('Src ' + sourceX + ',' + sourceY + ' Dest ' + destX + ',' + destY);

        await client
            .moveToElement(src, sourceX, sourceY)
            .mouseButtonDown(0)
            .moveToElement(dest, destX, destY)
            .moveToElement(dest, destX, destY)
            .mouseButtonUp(0)
            .pause(3000);

    },


    pullComponent: async function (componentName) {
        var src = '//h5[contains(.,"' + componentName + '")]/parent::div';
        var dest = '//*[@class="report-content"]'

        await client.useXpath()
            .waitForElementVisible(src, TIMEOUT)
            .moveToElement(src, 10, 10)
            .doubleClick()
            .pause(2000);
    },

    waitForElement: async function (selector) {
        if (selector.startsWith('/')) {
            await client.useXpath().waitForElementPresent(selector, data.DEFAULT_TIMEOUT);
            await client.useXpath().waitForElementVisible(selector, data.DEFAULT_TIMEOUT);
        } else {
            await client.useCss().waitForElementPresent(selector, data.DEFAULT_TIMEOUT);
            await client.useCss().waitForElementVisible(selector, data.DEFAULT_TIMEOUT);
        }
    }
}