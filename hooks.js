const { After, Status, AfterAll, Before, BeforeAll } = require('cucumber');
const { client } = require('nightwatch-cucumber');
var path = require('path');
var reporter = require('cucumber-html-reporter');
var robot = require("robotjs");
const login = client.page.loginpage();
const dashboard = client.page.dashboardPage();
var data = require('./config/login');
const commons = client.page.commons();


// create the driver before scenario if it's not instantiated

// var login = client.page.login();

function setSession() {
    client.setCookie({
        name: "_session_id",
        value: "NlZtWExsMFZDMDZaRWZXNU54bmRqODlyaURwSnV0ZkQ3NWl0dTlqcVJBL0VNc3NUQ2hVSS81UzkrNlNrdW1BY3hsTUIveXhyMVoxNkxQajdMZ21jalRhNDdMbTcwakorc3FCVGVlRzIzRlhpeWNTVUF4dTRCZW1xSlhHSmVBZ3Z0OE5qRHV6NUZ0RHVPaWtoUFk4SEp6VTBHL3h1eGZ1ZjB3TFp2WHBTU2I5RGZ1aGxhTlZkTVdpVFp1R2VheGtWSEU5UE84czZLTlhQakNaRVJmR2pxS0dZMzdiTjY3QXNzelBpVktaZUo1RlVTOCtiYTFKZ2QvUVp0dkVwdHJxNjMxa2taWWRnWVhRUWtHQW1iUStOWlY2cTMzZnI2WTJhSGx4SS8ya2RlQXFUeU4zT3Z2NEZiUEovVFlvVG9pRVYzWEt5R1FQa1F3d0FEemJhc3Vza1dRPT0tLXV3c0M2bzJ5TlBseUI3a05hYUcxVnc9PQ%3D%3D--6a30d0458ec0c4cc991d1216bf68b8bde0dd3dd9",
        path: "/",
        domain: "stg-airpr-roi.herokuapp.com",
        secure: true,
        httpOnly: true, // (Optional)
        //  expiry   : 1395002765 // (Optional) time in seconds since midnight, January 1, 1970 UTC
    });
}

BeforeAll(async function () {
    console.log('*********Starting Execution**********');
    var x = robot.getScreenSize().width;
    var y = robot.getScreenSize().height;
    // client.maximizeWindow();
    client.resizeWindow(x - 100, y - 100);
    // setSession();

    await login.navigate();
    await login.waitForElementVisible('@userName', data.DEFAULT_TIMEOUT);
    await login.assert.visible('@userName');
    await login.setValue('@userName', client.globals.username)
        .setValue('@password', client.globals.password)
        .click('@btnLogin')
        .waitForElementNotPresent('@btnLogin', data.DEFAULT_TIMEOUT);
        await dashboard.waitForElementVisible('@dashboardHeader', data.DEFAULT_TIMEOUT);
});

Before(function () {
    console.log('In Before ');
});


// executed after each scenario (always closes the browser to ensure fresh tests)
After(function (scenario) {
    console.log('in After')
});

//Executed after the suite is completed running
AfterAll(async function () {
    console.log('Logging Out.......');
    await commons.moveToElement('@leftMenu', 10, 10);
    await client.pause(2000);
    await client.useCss().click('.logout a');
    await client.pause(3000);

    await login.waitForElementPresent('@userName',data.DEFAULT_TIMEOUT);
    await login.assert.visible('@userName');
    console.log('Execution Completed');
});
