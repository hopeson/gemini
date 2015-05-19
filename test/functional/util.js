'use strict';
var Config = require('../../lib/config'),
    Browser = require('../../lib/browser'),
    supportedBrowsers = {
        // evergreen browsers are always tested against latest
        // version
        chrome: {
            browserName: 'chrome'
        },

        firefox: {
            browserName: 'firefox'
        },

        // Some specific versions we support
        ie8: {
            browserName: 'internet explorer',
            version: '8'
        },

        ie9: {
            browserName: 'internet explorer',
            version: '9'
        },

        ie10: {
            browserName: 'internet explorer',
            version: '10'
        },

        ie11: {
            browserName: 'internet explorer',
            version: '11'
        },

        opera12: {
            browserName: 'opera',
            version: '12'
        }
    },

    testsConfig = new Config({
        gridUrl: 'http://ondemand.saucelabs.com/wd/hub',
        rootUrl: 'http://example.com',
        projectRoot: process.cwd(),
        browsers: supportedBrowsers
    }),
    browserDescribe;

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
    browserDescribe = describe;
} else {
    browserDescribe = describe.skip;
    console.warn('WARNING: Sauce labs is not set up.');
    console.warn('Some functional tests will be skipped.');
    console.warn('To fix:');
    console.warn('1. Create account at https://saucelabs.com/opensauce/');
    console.warn('2. Set SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables');
}

exports.eachSupportedBrowser = function(cb) {
    var browsers = process.env.BROWSER in supportedBrowsers?
        [process.env.BROWSER] : Object.keys(supportedBrowsers);
    browsers.forEach(function(browserId) {
        browserDescribe('in ' + browserId, function() {
            beforeEach(function() {
                this.browser = new Browser(testsConfig, browserId);
            });

            cb();
        });
    });
};
