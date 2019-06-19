import { BeforeAll, Before, After, setDefaultTimeout } from 'cucumber';
import { browser } from 'protractor';

BeforeAll(() => {
    browser.waitForAngularEnabled(false);
    setDefaultTimeout(60 * 10000);

    
})

Before((scenario) => {
    console.log('\n\n===============================================');
    console.log('Running the Scenario: ' + scenario.pickle.name);
    console.time('\nScenario done in');
});

After(() => {
    // browser.params.selectedFilter = [];
    // browser.params.createdItemDetails = {};
    // browser.params.editedItemDetails = {};
    //TODO Clean up of created items in the reporting DB and cristal
    console.timeEnd('\nScenario done in');
    console.log('===============================================');
});