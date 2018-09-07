module.exports = {

    elements: {
        dashboardHeader: 'div > h1',
        profileContainer: '.breadcrumbs .profile-selector',
        campaignContainer: '.breadcrumbs .profile-selector + span',
        searchAndFilterContainer: '.breadcrumbs .saved-filter-dropdown',
        searchAndFilterDropdown: '.breadcrumbs .saved-filter-dropdown a',
        searchAndFilterDropdownMenu: '.breadcrumbs .saved-filter-dropdown ul',
        profileDropdown: '.breadcrumbs .profile-selector .nav-dropdown-selection',
        campaignDropdown: '.breadcrumbs .profile-selector + span .nav-dropdown-selection',
        dropdownMenu: '.breadcrumbs .profile-selector ul',
        campaignDropdownMenu: '.breadcrumbs .profile-selector + span ul',
        otherThanCurrentProfile: '.breadcrumbs .profile-selector + span li:nth-of-type(2)',
        clearCampaign: '.breadcrumbs .profile-selector + span ul li:nth-of-type(1)',
        articleCountCard: 'group-text',
        legendItem_1: 'div.card-container:nth-of-type(1) .legend-item',
        searchAndFilterMessage: '.ui-message-line',
        resetSFLink: '.ui-message-line a',
        tileHeader: '.ui-card-header .ui-editable-field',
        revertToWidgetDefaults: '.breadcrumbs .saved-filter-dropdown li',
        threeDots: '.ui-three-dots div[role=\'button\']',
        dropDestination: '.dashboard-cards-container .liquid-child .ui-drop-left',
        sidebar: '.ui-sidebar',
        coverageSection: 'div.ui-accordion:nth-of-type(1)'

    },

}

var dbcommands = {
    findAndClick: function (client) {
        this.api.elements('css selector', '.ui-three-dots div[role=\'button\']', async function (result) {
            for (var i = 0; i < result.value.length; i++) {
                this.elementIdClick(result.value[i].ELEMENT);
                await client.pause(2000);
                await client.useXpath().click('//a[contains(text(),\'Remove from dashboard\')]');
                await client
                    .waitForElementVisible('//button[normalize-space(.) = \'Delete\']', 1000)
                    .click('//button[normalize-space(.) = \'Delete\']');
                await client.pause(2000);
            }
        });
    }
}