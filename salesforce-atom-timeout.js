const wd = require('wd');
const B = require('bluebird');
const { retryInterval } = require('asyncbox');

const build = +new Date();
(async function () {
    async function runSession () {
        const caps = {
            "nativeWebTap": true,
            "deviceName": "iPhone 8 Simulator",
            "ignoreAboutBlankUrl": "true",
            "calendarAccessAuthorized": true,
            "safariLogAllCommunication": "true",
            "browserName": "Safari",
            "version": "",
            "server:CONFIG_UUID": "a6f9b275-e458-416c-9753-c6592a2bef53",
            "newCommandTimeout": 600,
            "platformVersion": "13.4",
            "platformName": "ios",
            "appiumVersion": "1.19.1",
            "newCommandTimeout": 0,
            "build": build + "-salesforce-build",
        };
        const host = process.env.CLOUD ? 'ondemand.saucelabs.com' : 'localhost';
        const port = process.env.CLOUD ? 80 : 4723;
        const config = {host, port};
        //let driver = await wd.promiseChainRemote({host: 'localhost', port: 4723});
        let driver = await wd.promiseChainRemote(config, process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY);
        try {
            await driver.init(caps);
            const context = await driver.currentContext();
            console.log('context:', context);
            await driver.setImplicitWaitTimeout(5000);
            await driver.elementByTagName('body');
            const res = await driver.execute(`return document.readyState == 'complete'`);
            console.log('ready state:', res);
            await driver.elementByTagName('body');
            await driver.url('http://www.google.com');
            await driver.sauceJobStatus(true);
        } catch(e) {
            failureCount++;
            console.error(e);
            await driver.sauceJobStatus(false);
        } finally {
            await driver.quit();
        }

    }
    let failureCount = 0;
    for (let i=0; i<100; i++) {
        if (process.env.CLOUD) {
            runSession();
        } else {
            await runSession();
        }
    }

    console.log(`=============FAILED '${failureCount}' TIMES==============`);

})();