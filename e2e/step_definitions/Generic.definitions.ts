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
import { ItemHelpers, Application } from "../helpers/test-helpers";
import { DetailsPO } from "../po/details.po";
import { ToolbarPO } from "../po/toolbar.po";
import { FormPO } from "../po/form.po";


// const path = `${browser.params.root}\\e2e\\${browser.params.project}\\items.hmws`;
// const Item = async () => {
//     // await import(browser.params.root + "/e2e/" + browser.params.project + "/")
//     await import(path)
// }
const baseUrl = browser.baseUrl;

const generic = new GenericPO();
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;


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
  itemDBData = itemDBData[`${ItemHelpers.randomWholeNumber(0, itemDBData.length - 1)}`];

  item.name = itemDBData[item.getUrlIdentifier().toUpperCase()];
  browser.params.selectedItemDetails[itemType] = { Name: item.name }; 
  const currentUrl = await browser.getCurrentUrl();
  await browser.get(item.getUrl());
  
  const redirected = await Application.isRedirected(currentUrl, item.getUrl());
  if (!redirected) {
    throw `The browser did not navigate to the ${itemType} details page`; 
  }
  console.timeEnd(timeLabel);
});


When('I {string} a {string} item', async function (action: 'create' | 'edit', itemType: string) {
  const timeLabel = `Processing ${action} ${itemType}`;
  console.time(timeLabel);

  if(action === 'create'){
    browser.params['previousURL'] = await browser.getCurrentUrl();
    browser.params[itemType] = {};

    const newButton = await ToolbarPO.getNewButton();
    await ElementIs.clickable(newButton);
    await newButton.click();

    const formPanel = await FormPO.getFormPanel();
    let formHeader = await FormPO.getFormName();
    await ElementIs.containingText(formHeader, itemType);

    const itemClass = itemType.replace('\s+', '');
    const item: Item = new HMWSItems[`${itemClass}`]();
    browser.params['inputedData'] = await Form.fill(item.buildFormData());

    const okButton = await FormPO.getOkButton();
    await ElementIs.clickable(okButton);
    await okButton.click();

    await ElementIs.stale(formPanel);

    browser.params[itemType]['currentTestIndex'] = item.currentTestIndex;
  }

    console.timeEnd(timeLabel);
});

Then('I should see the {string} details of the {string}', async function (actionDone: 'created' | 'selected' | 'edited' | 'deleted', itemType) {
  const timeLabel = `Checking the details of the ${actionDone} ${itemType}`; 
  console.time(timeLabel);

  itemType = itemType.replace('\s+', '');
  const item = new HMWSItems[`${itemType}`]();
  let filters = [];
  
  switch (actionDone) {
    case 'selected':
      const selectedItem = browser.params.selectedItemDetails[itemType].Name;
      let outcomeCols = [];
      
      item.getUrlIdentifier();
      filters.push(`"${item.getUrlIdentifier().toUpperCase()}" = '${selectedItem}'`);
      Object.keys(item.details.outcome).forEach(key => {
        outcomeCols.push(key);
      });

      let itemDetails = await ReportingDB.getItem(itemType, outcomeCols, filters, 'ACTIVE');
      const actualJSON = {};

      // TODO:TOFIX Remove this when items from outcome view that are shown in tables are saved in reporting d
      if (itemType === 'Company') {
        outcomeCols = outcomeCols.filter(ele => ele !== 'Phone' && ele !== 'Email');
        delete itemDetails.PHONE;
        delete itemDetails.EMAIL;
      }

      for (const ele of outcomeCols) {
        actualJSON[ItemHelpers.toUpperCaseTrimmed(ele)] = await DetailsPO.getFieldDetail(ele);
      }

      expect(itemDetails).to.eql(actualJSON);
      break;
    
    case 'created':
      const inputedData = browser.params['inputedData'];

      if(!inputedData){
        throw(`browser.params['inputedData'] is not defined.`);
      }
      
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
      break;
  }

  console.timeEnd(timeLabel);
});