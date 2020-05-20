// next line is optional, just for IDEs autocomplete :
/// <reference types="@applitools/eyes-testcafe" />

import Eyes from '@applitools/eyes-testcafe';

// Initialize the eyes
const eyes = new Eyes();

// Set page used in the test
fixture`Testcafe Demo App`.page`https://demo.applitools.com`
    // Call Close on eyes to let the server know it should display the results
    .afterEach(async () => eyes.close())
    .after(async () => {
        // Wait and collect all test results
        // we pass false to this method to suppress the exception that is thrown if we
        // find visual differences
        let allTestResults = await eyes.waitForResults(false)
        // Print results
        console.log(allTestResults)
    });

test('ultraFastTest', async t => {
    // Call Open on eyes to initialize a test session
    await eyes.open({
        t, // pass testcafe contorller
        appName: 'Demo App',
        testName: 'Ultrafast grid demo',
        //
        browser: [
            // Add browsers with different viewports
            {width: 800, height: 600, name: 'chrome'},
            {width: 700, height: 500, name: 'firefox'},
            {width: 1600, height: 1200, name: 'ie11'},
            {width: 1024, height: 768, name: 'edgechromium'},
            {width: 800, height: 600, name: 'safari'},
            // Add mobile emulation devices in Portrait mode
            {deviceName: 'iPhone X', screenOrientation: 'portrait'},
            {deviceName: 'Pixel 2', screenOrientation: 'portrait'}
        ],
        // set batch name to the configuration
        batchName: 'Ultrafast Batch'
    });

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html
    await eyes.checkWindow({
        tag: "Login Window",
        target: 'window',
        fully: true
    });

    // This will create a test with two test steps.
    await t.click('#log-in')

    // Check the app page
    await eyes.checkWindow({
        tag: "App Window",
        target: 'window',
        fully: true
    })
});