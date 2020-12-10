# CASE 1:
```
node ./salesforce-atom-timeout.js
direct-domain: www.yahoo.com,www.bing.com
```
## Data

| TEST # | PASSES | FAILS | ERRORS |
=========|========|=======|========|
| 1      | 97     | 3     | 0      |
| 1      | 97     | 3     | 0      |

sample failure: https://app.saucelabs.com/tests/b955f928925a4c518719b12630fb0938#3
sample pass: https://app.saucelabs.com/tests/8a25a0c85c0a4433ad3cb7becf1ee303

## Observations
```
2020-12-10 05:52:31:401 - [debug] [XCUITest] Remote debugger notified us of a new page listing: {"appIdKey":"4242","pageArray":[{"id":1,"title":"Appium/welcome","url":"http://127.0.0.1:4443/welcome","isKey":true},{"id":5,"title":"Bad Gateway","url":"https://yahoo.com/","isKey":false}]}
2020-12-10 05:52:31:401 - [debug] [XCUITest] We have new pages, selecting page '5'
```

* This form of log message appeared on all three of the failing tests
* This log message did not appear on most (but not all) passing tests
