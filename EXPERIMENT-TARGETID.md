# Experiment

Run `node ./target-id.js`, which runs the script that reproduces the target-id issue 25 times. Run it against Appium v1.19.0 first and count the failures. Then run it against the Appium v1.19 branch with the latest `appium-remote-debugger` patch (8.13.2) that has a fix.

## Results

### Appium v1.19.0

Device: "iPhone 11 Pro Max"
Version: iOS 13.4
OS: macOS 10.15
Virtual Machine

### Appium 1.19 branch with 8.13.2 remote debugger (patches targetId issue)
RUN #1) 0 out of 25 failed
RUN #2) 0 out of 25 failed
RUN #3) 0 out of 25 failed

### Appium 1.19 branch with 8.13.1 remote debugger (before targetId patch)
RUN #1) 8 out of 25 failed
RUN #2) 5 out of 25 failed
RUN #3) 0 out of 25 failed