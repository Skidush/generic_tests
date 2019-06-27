import { BeforeAll, Before, After, setDefaultTimeout } from 'cucumber';
import { browser } from 'protractor';

BeforeAll(() => {
    browser.waitForAngularEnabled(false);
    setDefaultTimeout(60 * 10000);
})

Before((scenario) => {
    console.log('\n\n===============================================================');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('SCENARIO: ' + scenario.pickle.name);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.time('\nScenario done in');
});

After(() => {
    // Reset to default
    browser.params.itemDetails = {};
    //TODO Clean up of created items in the reporting DB and cristal
    console.timeEnd('\nScenario done in');
    console.log('===============================================================');
});