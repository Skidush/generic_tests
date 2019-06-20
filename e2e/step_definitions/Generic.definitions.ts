import { Given, When, Then } from "cucumber";
import { browser, protractor } from "protractor";

import { GenericPO } from "../po/generic.po";

import { ItemListPO } from "../po/item-list.po";
import { GenericHelper } from "../helpers/generic-helpers";
import { ReportingDB } from "../helpers/reportingDB-helpers";
import { ElementIs } from "../helpers/element-helpers";
import { Form } from "../helpers/form-helpers";

import { ItemForm } from '../hmws/itemForm.hmws';
import { Item } from "../hmws/item.hmws";
import { HMWSItems } from "../hmws/items.hmws";
import { ItemHelper, Application } from "../helpers/test-helpers";


// const path = `${browser.params.root}\\e2e\\${browser.params.project}\\items.hmws`;
// const Item = async () => {
//     // await import(browser.params.root + "/e2e/" + browser.params.project + "/")
//     await import(path)
// }
const baseUrl = browser.baseUrl;

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const generic = new GenericPO();
const EC = protractor.ExpectedConditions;


Given("I have an existing {string}", async function(itemType) {
    const timeLabel = "Checking for existing items for " + itemType;
    console.time(timeLabel);

    const item: Item = new HMWSItems[`${itemType}`]();
    const itemDBData = await ReportingDB.getItems(itemType);
    if (itemDBData.length === 0 || !itemDBData) {
        //TODO:TOFIX Create an item if nothing exists.
        throw 'There are no exisiting ' + item.pluralName + ' found in the database';
    }

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

When('The {string} table has loaded', async function (itemType) {
  const timeLabel = "Waiting for the table to load";
  console.time(timeLabel);

  const itemColumns = new HMWSItems[`${itemType}`]().list.columns;
  // Wait for all columns to load
  // If the column doesn't exist, it will throw an error
  for (const col of itemColumns) {
      await ItemListPO.getColumn(col.replace(/\s+/g, ""));
  }
  
  const itemTableRows = ItemListPO.getTableRows();
  await ElementIs.present(itemTableRows.first());
  const itemTableRowCount = await itemTableRows.count();
  
  if (itemTableRowCount === 0) {
      throw 'The table did not load any rows'
  }

  console.timeEnd(timeLabel);
});

When("I {string} a {string}", async function(action, itemType) {
  console.time(itemType + " action - " + action);

  console.timeEnd(itemType + " action - " + action);
});

Then(
  "I should be redirected to the details page of the created {string}",
  async function(itemType) {
    console.time("Redirection check for " + itemType);

    console.timeEnd("Redirection check for " + itemType);
  }
);

Then("I should see the {string} item details of the {string}", async function(action, itemType
) {
  console.time("Details check for " + action + " " + itemType);

  console.timeEnd("Details check for " + action + " " + itemType);
});

Then("I should {string} the details of the {string} in the table", async function(view: 'see' | 'not see', itemType) {
    const timeLabel = `Searching in the table for ${itemType}`; 
    console.time(timeLabel);
    let state;
    if (view === 'see') {
      state = 'ACTIVE';
      itemType = GenericHelper.getSingularName(itemType);
    }

    const item = new HMWSItems[`${itemType}`]();
    const itemDBData = await ReportingDB.getItemTableData(
        itemType, item.list.columns, state, item.list.orderBy, item.list.pageRows);
    
    for (const col of item.list.columns) {
        await ItemListPO.getColumn(col.replace(/\s+/g, ""));
    }

    const tableHeader = await ItemListPO.getTableHeader();
    let tableHeaderText: any = await tableHeader.getText();
    tableHeaderText = tableHeaderText.split('\n');
    // Sometimes protractor doesn't get the text of the column that is off-screen.
    // Place it in the expected columns since it passed the check earlier
    for (const col of item.list.columns) {
      if (!tableHeaderText.includes(col)){
        tableHeaderText.push(col);
      }
    }
    
    const tableRows = ItemListPO.getTableRows();
    await ElementIs.present(tableRows.first());
    // TODO:TOFIX blinking elements in the table when reloading the table
    await browser.sleep(1500);
    const itemListData: any = await tableRows.getText();

    itemListData.unshift(tableHeaderText);
    const parsedItemData = [];
    // Parse the data from Reporting DB to match the format of the data extracted from the table
    for (const item of itemDBData) {
      let rowData;
      Object.keys(item).forEach(key => {
        if (!item[key]) {
          return;
        }
        item[key] = item[key].replace(/ {1,}/g, " ");
        rowData = rowData ? rowData + ' ' + item[key] : item[key];
      });
      parsedItemData.push(rowData);
    }
    
    parsedItemData.unshift(item.list.columns);
    expect(itemListData).to.eql(parsedItemData);

    console.timeEnd(timeLabel);
});

When('I navigate to a\\/an {string} details page', async function (itemType) {
  const timeLabel = `Navigating to ${itemType} details page`;
  console.time(timeLabel);

  const item = new HMWSItems[`${itemType}`]();
  
  let itemDBData = await ReportingDB.getItems(itemType)
  itemDBData = itemDBData[`${ItemHelper.randomWholeNumber(0, itemDBData.length)}`];

  item.name = itemDBData[item.getUrlIdentifier().toUpperCase()];

  const currentUrl = await browser.getCurrentUrl();
  await browser.get(item.getUrl());
  
  const redirected = await Application.isRedirected(currentUrl, item.getCurrentUrl());
  if (!redirected) {
    throw `The browser did not navigate to the ${itemType} details page`; 
  }
  console.timeEnd(timeLabel);
});


When('I {string} a {string} item', async function (action: string, itemType: string) {
  console.time(`Processing ${action} ${itemType}`);
  const previousURL = await browser.getCurrentUrl();

  await ElementIs.present(generic.toolbar.get(0));
  const newButton = generic.button('New');
  await ElementIs.clickable(newButton);
  await newButton.click();

  await ElementIs.visible(generic.formHeader);
  await ElementIs.containingText(generic.formHeader, itemType);

  const itemClass = itemType.replace('\s+', '');
  const item: Item = new HMWSItems[`${itemClass}`]();
  await Form.fill(item.buildFormData());

  const okButton = generic.button('OK')
  await ElementIs.clickable(okButton);
  await okButton.click();

  await browser.wait(EC.not(EC.urlIs(previousURL)))

  console.timeEnd(`Processing ${action} ${itemType}`);
});


Then('I should see the {string} details of {string}', function (actionDone: 'created' | 'selected' | 'edited' | 'deleted', itemType) {
  const timeLabel = `Checking the details of the ${actionDone} ${itemType}`; 
  console.time(timeLabel);

  const item = new HMWSItems[`${itemType}`]();
  item.getUrlIdentifier();
  // WHERE "item.getUrlIdentifier()" = item.name;
  // 
  // const itemDetails = await ReportingDB
  switch (actionDone) {
    case 'selected':

      break;
  }

  console.timeEnd(timeLabel);
});
