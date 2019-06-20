import { Given, When, Then } from "cucumber";
import { browser } from "protractor";
import { ElementIs } from "../helpers/element-helpers";
import { GenericPO } from "../po/generic.po";
import { Form } from "../helpers/form-helpers";
import { Item } from "../hmws/item.hmws";
import { HMWSItems } from "../hmws/items.hmws";
import { Application } from "../helpers/test-helpers";


// const path = `${browser.params.root}\\e2e\\${browser.params.project}\\items.hmws`;
// const Item = async () => {
//     // await import(browser.params.root + "/e2e/" + browser.params.project + "/")
//     await import(path)
// }
const baseUrl = browser.baseUrl;

const generic = new GenericPO();
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;


Given("I have an existing {string}", async function(itemName) {
    const timeLabel = "Checking for existing items for " + itemName;
    console.time(timeLabel);

    const item = new Item[`${itemName}`]();
    // const item = new Item.Company();
    console.log(item.form.schema);

    console.timeEnd(timeLabel);
  });

Given("I go to {string}", async function(path) {
  const timeLabel = "Navigate to " + path;
  console.time(timeLabel);
  const currentUrl = await browser.getCurrentUrl();
  path = baseUrl + path;

  if (currentUrl === path) {
    await browser.refresh();
    return;
  }

  await browser.get(path);
  console.timeEnd(timeLabel);
});

When('I click the {string} button', async function (buttonID) {
  const button = generic.button(buttonID);
  await ElementIs.clickable(button);
  await button.click();
});

Given("I am on {string}", async function(path) {
  const timeLabel = "Configuring the system to be on " + path;
  console.time(timeLabel);

  path = browser.baseUrl + path;
  const currentUrl = await browser.getCurrentUrl();
  if (path !== currentUrl) {
    await browser.get(path);
  }

  console.timeEnd(timeLabel);
});

When("I {string} a {string}", async function(action, itemName) {
  console.time(itemName + " action - " + action);

  console.timeEnd(itemName + " action - " + action);
});

Then(
  "I should be redirected to the details page of the created {string}",
  async function(itemName) {
    console.time("Redirection check for " + itemName);

    console.timeEnd("Redirection check for " + itemName);
  }
);

Then(
  "I should {string} the details of the {string} in the table",
  async function(view, itemName) {
    console.time("Searching in the table for " + itemName);

    console.timeEnd("Searching in the table for " + itemName);
  }
);

When('I {string} a {string} item', async function (action: 'create' | 'edit', itemType: string) {
  const timeLabel = `Processing ${action} ${itemType}`;
  console.time(timeLabel);
  if(action === 'create'){
    browser.params['previousURL'] = await browser.getCurrentUrl();

    await ElementIs.present(generic.toolbar.get(0));
    const newButton = generic.button('New');
    await ElementIs.clickable(newButton);
    await newButton.click();

    await ElementIs.visible(generic.formHeader);
    await ElementIs.containingText(generic.formHeader, itemType);

    const itemClass = itemType.replace('\s+', '');
    const item: Item = new HMWSItems[`${itemClass}`]();
    browser.params['inputedData'] = await Form.fill(item.buildFormData());

    const okButton = generic.button('OK');
    await ElementIs.clickable(okButton);
    await okButton.click();
    browser.params[itemType]['currentTestIndex'] = item.currentTestIndex;
  }

  console.timeEnd(timeLabel);
});


Then('I should see the {string} details of the {string}',
  async function (actionDone: 'created' | 'edited', itemType: string) {
  const timeLabel = `Checking the details of the ${actionDone} ${itemType}`;
  console.time(timeLabel);

  if(actionDone === 'created'){

    const inputedData = browser.params['inputedData'];
    if(!inputedData){
      throw(`browser.params['inputedData'] is not defined.`);
    }
    const itemClass = itemType.replace('\s+', '');
    let item: Item = new HMWSItems[`${itemClass}`]();

    const testIndex = browser.params[itemType]['currentTestIndex'];
    if(Number.isNaN(testIndex)){
      throw(`browser.params['${itemType}']['currentTestIndex'] is not set.`);
    }

    item.initializeTestData(testIndex);
    const isRedirected = await Application.isRedirected(browser.params['previousURL'], item.getUrl(), 5000);
    if(isRedirected){
      item.formFields.forEach((field) => {
        expect(item[field.key]).to.equal(inputedData[field.ID]);
      });
    }
    else
      throw('Did not redirect');

  }

  console.timeEnd(timeLabel);
});
