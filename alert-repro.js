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

            await driver.get("https://qavbox.github.io/demo/signup/");
            await B.delay(2000);
            console.log(await driver.source());
            const submitBtn = await driver.elementById('submit');
            await submitBtn.click();
            const startTime = +(new Date());
            await retryInterval(5, 500, () => driver.acceptAlert());
            const duration = ((+(new Date())) - startTime) / 1000;
            console.log(`It took '${duration}' seconds to accept`);
            await B.delay(1000);
        } catch(e) {
            failureCount++;
            console.error(e);
        } finally {
            await driver.quit();
        }
    }

    console.log(`=============FAILED '${failureCount}' TIMES==============`);

})();