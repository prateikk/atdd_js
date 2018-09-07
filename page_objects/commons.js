const {client} = require('nightwatch-cucumber');

var navBarCss = ".ui-nav-left-content > ul > ";


module.exports = {
    elements: {
        navPlan: 'nav > ul.primary-nav > li.plan',
        leftMenu: '.ui-nav-left-content',
        planContainer: '.plan-tile-container.campaigns',
        dashboardContainer:'.dashboard-cards-container',
        analyzeContainer:'.analyze-main-container',
        reportContainer:'.reports-main-container'

    },

    // navigate to menuoption
    navigate: async function (menuOption) {

        await client.expect.element('@navPlan').to.be.present.before(10000);

        await client.moveToElement('@leftMenu');
        console.log('moving mouse');
        await client.pause(1000);
        await client.click('@navPlan');

    },



};
