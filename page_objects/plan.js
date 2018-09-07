var submenuBaseCss = "h1 >> a:contains(";
var buttonBaseXpath = '//button[contains(text(),\'';

module.exports = {

    elements: {
        planHeader:  '.ui-page-title h1',
        submenu: 'h1 span a',
        btnNewCampaign:'button.btn.btn-primary',
        textAreaForCampaign:'.campaign-keywords-field,#campaign-keywords',
        campaignName:'input[placeholder=\'Campaign Name\']',
        textAreaForTargetMedia : '//textarea[@placeholder="forbes.com" or contains(@id,"campaign-keywords")]',
    },
}