import { Given, When, Then } from "cucumber";
import { browser, protractor, by, element } from "protractor";

import { GenericPO } from "../po/generic.po";
import { ItemListPO } from "../po/item-list.po";
import { DetailsPO } from "../po/details.po";
import { ToolbarPO } from "../po/toolbar.po";
import { FormPO } from "../po/form.po";

import { ReportingDB } from "../helpers/reportingDB-helpers";
import { ElementIs } from "../helpers/element-helpers";
import { Form } from "../helpers/form-helpers";
import { ItemHelpers, Application } from "../helpers/test-helpers";

import { ItemForm } from '../hmws/itemForm.hmws';
import { Item, ItemRegistrar } from "../hmws/item.hmws";
import { TableSelector } from "../hmws/itemList.hmws";
import { HMWSItems } from "../hmws/items.hmws";



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

When('I click the {string} button', async function (buttonID) {
  const button = generic.button(buttonID);
  await ElementIs.clickable(button);
  await button.click();
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

  await ElementIs.stale(element(by.className('ui-table-loading')));

  console.timeEnd(timeLabel);
});

When('I navigate to a\\/an {string} details page', async function (itemType) {
  const timeLabel = `Navigating to ${itemType} details page`;
  console.time(timeLabel);

  const item = new HMWSItems[`${itemType}`]();

  let itemDBData = await ReportingDB.getItems(itemType)
  itemDBData = itemDBData[`${ItemHelpers.randomWholeNumber(0, itemDBData.length - 1)}`];

  item.name = itemDBData[item.getUrlIdentifier().toUpperCase()];

  if (!browser.params.itemDetails[itemType]) {
    browser.params.itemDetails[itemType] = {};
  }

  browser.params.itemDetails[itemType]['selectedData'] = { Name: item.name };

  const currentUrl = await browser.getCurrentUrl();
  await browser.get(item.getUrl());

  const redirected = await Application.isRedirected(currentUrl, item.getUrl());
  if (!redirected) {
    throw `The browser did not navigate to the ${itemType} details page`;
  }
  console.timeEnd(timeLabel);
});

When('I {string} a\\/an {string} item', async function (action: 'create' | 'edit' | 'select' | 'delete', itemType: string) {
  const timeLabel = `Processing ${action} ${itemType}`;
  console.time(timeLabel);

  let formPanel;
  let formHeader;

  itemType = itemType.replace('\s+', '');
  const item: Item = new HMWSItems[`${itemType}`]();

  browser.params.itemDetails[itemType] = {};
  browser.params.itemDetails[itemType]['previousURL'] = await browser.getCurrentUrl();

  switch (action) {
    case 'create':
        const newButton = await ToolbarPO.getNewButton();
        await ElementIs.clickable(newButton);
        await newButton.click();

        formPanel = await FormPO.getFormPanel();
        formHeader = await FormPO.getFormName();
        await ElementIs.containingText(formHeader, itemType);

        browser.params.itemDetails[itemType]['inputtedData'] = await Form.fill(item.buildFormData());

        const okButton = await FormPO.getOkButton();
        await ElementIs.clickable(okButton);
        await okButton.click();

        await ElementIs.stale(formPanel);

        browser.params.itemDetails[itemType]['currentTestIndex'] = item.currentTestIndex;
      break;
    case 'edit':
    case 'delete':
        const filters = [`"STATE" = 'ACTIVE'`];
        let randomItem: any = await ReportingDB.getItem(itemType, item.list.columns, filters, item.list.orderBy, item.list.pageRows);
        const randomIndex = ItemHelpers.randomWholeNumber(0, randomItem.length - 1);
        randomItem = randomItem[randomIndex];

        await ElementIs.present(ItemListPO.getTableRows().get(randomIndex));
        const tableRow = await ItemListPO.getTableRows().get(randomIndex);
        const tableRowData = await tableRow.getText();

        // Some tables (e.g Machine item list) show the rows while its still loading
        await ElementIs.stale(element(by.className('ui-table-loading')));

        if (item.list.selector === TableSelector.ROW) {
          await tableRow.click();
        } else if (item.list.selector === TableSelector.RADIOBUTTON) {
          const radioButton = await tableRow.element(by.css('.RadioButton span'));
          radioButton.click();
        }

        if (action === 'delete') {
          browser.params.itemDetails[itemType]['deletedData'] = {};
          const deleteButton = await ToolbarPO.getDeleteButton();
          await deleteButton.click();

          const dialog = await ToolbarPO.getDialog();
          const yesDialogButton = await ToolbarPO.getDialogYesButton();
          yesDialogButton.click();

          await ElementIs.stale(dialog);

          browser.params.itemDetails[itemType]['deletedData'] = tableRowData;
        } else if (action === 'edit') {
          browser.params.itemDetails[itemType]['editedData'] = {};
          const editButton = await ToolbarPO.getEditButton();
          await editButton.click();

          const formPanel = await FormPO.getFormPanel();
          let formHeader = await FormPO.getFormName();

          await ElementIs.containingText(formHeader, itemType);

          browser.params.itemDetails[itemType]['inputtedData'] = await Form.fill(item.buildFormData());

          const okButton = await FormPO.getOkButton();
          await ElementIs.clickable(okButton);
          await okButton.click();

          await ElementIs.stale(formPanel);

          browser.params.itemDetails[itemType]['currentTestIndex'] = item.currentTestIndex;
        }
        break;
    }

    browser.params.itemDetails[itemType]['currentAction'] = action;

    console.timeEnd(timeLabel);
});

Then("I should {string} the details of the {string} in the table", async function(view: 'see' | 'not see', itemType) {
  const timeLabel = `Searching in the table for ${itemType}`;
  console.time(timeLabel);

  // itemType = GenericHelper.getSingularName(itemType);
  itemType = ItemRegistrar.findClass(itemType)
  const expectedData = [];
  
  let filters = [`"STATE" = 'ACTIVE'`];
  
  const item = new HMWSItems[`${itemType}`]();
  const itemDBData = await ReportingDB.getItem(
    itemType, item.list.columns, filters, item.list.orderBy, item.list.pageRows);

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

  //TODO:TOFIX Rows blinking after delete or edit leading to stale element error
  await ElementIs.stale(element(by.className('ui-table-loading')));
  await browser.sleep(1500);
  const tableRows = ItemListPO.getTableRows();
  await ElementIs.present(tableRows.first());

  const itemListData: any = await tableRows.getText();
  itemListData.unshift(tableHeaderText);

  const currentAction = browser.params.itemDetails[itemType] ? browser.params.itemDetails[itemType]['currentAction'] : null;
  if (currentAction === 'delete' && view === 'not see') {
    const deletedData: any = browser.params.itemDetails[itemType]['deletedData'];
    expect(itemListData).to.not.include(deletedData);
  } else if (currentAction === 'edit' && view === 'see') {
    expectedData.push(Object.values(browser.params.itemDetails[itemType]['inputtedData']).join(' ').concat(' ACTIVE'));
    expect(itemListData).to.include(expectedData[0]);
  } else {
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
      expectedData.push(rowData);
    }

    expectedData.unshift(item.list.columns);
    expect(itemListData).to.eql(expectedData);
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
        const selectedItem = browser.params.itemDetails[itemType]['selectedData'].Name;
        let outcomeCols = [];

        item.getUrlIdentifier();
        filters.push(`"${item.getUrlIdentifier().toUpperCase()}" = '${selectedItem}'`);
        filters.push(`"STATE" = 'ACTIVE'`);
        Object.keys(item.details.outcome).forEach(key => {
          outcomeCols.push(key);
        });

        let itemDetails = await ReportingDB.getItem(itemType, outcomeCols, filters);
        itemDetails = itemDetails[0];
        const actualJSON = {};

        // TODO:TOFIX Remove this when items from outcome view that are shown in tables are saved in reporting db
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
    case 'edited':
        const inputtedData = browser.params.itemDetails[itemType]['inputtedData'];

        if(!inputtedData){
          throw(`The item details of the ${actionDone} ${itemType} is not defined.`);
        }

        const testIndex = browser.params.itemDetails[itemType]['currentTestIndex'];
        if(Number.isNaN(testIndex)){
          throw(`The currentTestIndex of the ${actionDone} ${itemType} is not set.`);
        }

        if (actionDone === 'created') {
          item.initializeTestData(testIndex);
          const isRedirected = await Application.isRedirected(browser.params.itemDetails[itemType]['previousURL'], item.getUrl(), 5000);
          if(isRedirected){
            item.formFields.forEach((field) => {
              expect(item[field.key]).to.equal(inputtedData[field.ID]);
            });
          } else {
            throw(`The browser did not redirect to: ${item.getUrl()}`);
          }
        }
      break;
  }

  console.timeEnd(timeLabel);
});