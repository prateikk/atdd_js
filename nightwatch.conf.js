//Nightwatch Configuration

const seleniumServer = require('selenium-server')
const phantomjs = require('phantomjs-prebuilt')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')

require('nightwatch-cucumber')({
    cucumberArgs: [
        '--require-module', 'babel-core/register',
        '--format', 'node_modules/cucumber-pretty',
        '--require', 'hooks.js',
        '--require', 'features/step_definitions',
        '--format-options', '{"colorsEnabled":true}',
        '--format', 'json:reports/cucumber.json',
        'features'
    ],
    nightwatchOutput: true
})

module.exports = {
    // src_folders:'features',
    output_folder: 'reports',
    custom_assertions_path: '',
    page_objects_path: 'page_objects/',
    live_output: true,
    disable_colors: false,

    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        log_path: '/reports',
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': chromedriver.path,
            'webdriver.gecko.driver': geckodriver.path,
            "webdriver.edge.driver": "",

        }
    },
    test_settings: {
        default: {
            
            },
            selenium_port: 4444,
            selenium_host: '127.0.0.1',
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
                silent: false
                //chromeOptions:['start-fullscreen']

            },

            selenium: {},
            screenshots: {
                enabled: true,
                on_failure: true,
                path: 'screenshots'
            }
        },
        nudge: {
        },
        staging: {
        },
        dev: {
        },
        semaphore: {
            //launch_url: 'http://localhost/',
            selenium_port: 4444,
            selenium_host: '127.0.0.1',
            desiredCapabilities: {
                browserName: 'phantomjs',
                javascriptEnabled: true,
                acceptSslCerts: true,
                //platform: 'Mac OS X',
                "phantomjs.binary.path": phantomjs.path,
                "phantomjs.cli.args": ['--ignore-ssl-errors=true']
            },

        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        },
        safari: {
            desiredCapabilities: {
                browserName: 'safari',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        },
        //headless does not open any browser instance, runs everything in the background, similar to phantomjs
        headless: {
            desiredCapabilities: {
                browserName: 'htmlunit',
                javascriptEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    "args": ["--headless"]
                }
            }
        }
    }
};
