const wd = require('wd');
const B = require('bluebird');
const { retryInterval } = require('asyncbox');

(async function () {
    let failureCount = 0;
    for (let i=0; i<100; i++) {
        let driver = await wd.promiseChainRemote({host: 'localhost', port: 4723});
        try {
            await driver.init({
                platformName: 'iOS',
                deviceName: 'iPhone 11 Pro Max',
                platformVersion: process.env.PLATFORM_VERSION || '13.4',
                automationName: 'XCUITest',
                browserName: 'safari',
                safariAllowPopups: true,
                safariLogAllCommunication: true,
            });

            await driver.get('http://alpha.realtor.com/realestateandhomes-search/Los-Angeles_CA?ab_vst=SWIPE_C&ads=0&tracking=0&split_tcv=157');
            await B.delay(1000);
            console.log(await driver.source());
        } catch(e) {
            console.error(e);
        } finally {
            await driver.quit();
        }
    }
    console.log(`=============FAILED '${failureCount}' TIMES==============`);

})();