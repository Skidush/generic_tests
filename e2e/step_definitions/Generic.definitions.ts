import { Given, When, Then } from "cucumber";
import { browser } from "protractor";
import { ItemForm } from '../hmws/itemForm.hmws';
import * as Item from '../hmws/items.hmws';

// const path = `${browser.params.root}\\e2e\\${browser.params.project}\\items.hmws`;
// const Item = async () => {
//     // await import(browser.params.root + "/e2e/" + browser.params.project + "/")
//     await import(path)
// }
const baseUrl = browser.baseUrl;

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

  console.timeEnd(timeLabel);
});

Given("I am on {string}", async function(path) {
  const timeLabel = "Configuring the system to be on " + path;
  console.time(timeLabel);

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

Then("I should see the {string} item details of the {string}", async function(action, itemName
) {
  console.time("Details check for " + action + " " + itemName);

  console.timeEnd("Details check for " + action + " " + itemName);
});

Then(
  "I should {string} the details of the {string} in the table",
  async function(view, itemName) {
    console.time("Searching in the table for " + itemName);

    console.timeEnd("Searching in the table for " + itemName);
  }
);
