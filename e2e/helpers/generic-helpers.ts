import { browser, element, by } from "protractor";

import { Form } from "../helpers/form-helpers";
import { ItemHelpers } from "../helpers/test-helpers";
import { Application } from "../helpers/test-helpers";
import { ElementIs, GetElement } from "../helpers/element-helpers";
import { ReportingDB } from "../helpers/reportingDB-helpers";

import { ToolbarPO } from "../po/toolbar.po";
import { FormPO } from "../po/form.po";
import { ItemListPO } from "../po/item-list.po";

const fs = require("fs");
 
const root = browser.params.root;

export class GenericHelper {

  static getPluralName(itemName: string) {
    const rawData = fs.readFileSync(root + "/e2e/data/itemNames.td.json");
    const itemNames = JSON.parse(rawData);

    return itemNames[Object.keys(itemNames).find(key => key === itemName)];
  }
  
  static getSingularName(itemNamePlural: string) {
    const rawData = fs.readFileSync(root + "/e2e/data/itemNames.td.json");
    const itemNames = JSON.parse(rawData);

    return Object.keys(itemNames).find(key => itemNames[key] === itemNamePlural);
  }

  // static async createItem(itemName: string) {
  //   const formSchemaWithValues = ItemHelper.getFormSchemaWithValues(itemName);
  //   const rawItemValues = ItemHelper.getRawValues(formSchemaWithValues);
    
  //   const newButton = await ToolbarPO.getNewButton();
  //   await newButton.click();
    
  //   const formPanel = await FormPO.getFormPanel();
  //   let formHeader = await FormPO.getFormName();
    
  //   // Anti-pattern: Tests should only fail for a single reason. 
  //   // Create a separate test for form checking
  //   const correctForm = await Form.compareFormHeader("New " + itemName, formHeader);
  //   if (!correctForm) {
  //     throw 'The create form for - ' + itemName + ' was not displayed, the form - ' + formHeader + ' was shown instead';
  //   }
    
  //   await Form.fill(formSchemaWithValues);
    
  //   const submitButton = await FormPO.getOkButton();
  //   await submitButton.click();
    
  //   await ElementIs.stale(formPanel);

  //   browser.params.createdItemDetails[itemName] = rawItemValues;
  // }

  // static async editItem(itemName: string) {
  //   const formSchemaWithValues = ItemHelper.getFormSchemaWithValues(itemName);
  //   const rawItemValues = ItemHelper.getRawValues(formSchemaWithValues);

  //   const tableConfig = ItemHelper.getItemConfig(itemName).tableConfig;

  //   let randomItem: any = await ReportingDB.getItemTableData(itemName, tableConfig);

  //   const randomIndex = ItemHelper.randomWholeNumber(0, randomItem.length - 1);
    
  //   randomItem = randomItem[randomIndex];

  //   await ElementIs.present(ItemListPO.getTableRows().get(randomIndex));
  //   const tableRows = await ItemListPO.getTableRows().get(randomIndex);
  //   const radioButton = await tableRows.element(by.css('.RadioButton span'));
  //   await radioButton.click();

  //   const editButton = await ToolbarPO.getEditButton();
  //   await editButton.click();

  //   const formPanel = await FormPO.getFormPanel();
  //   let formHeader = await FormPO.getFormName();

  //   // Anti-pattern: Tests should only fail for a single reason. 
  //   // Create a separate test for form checking
  //   const correctForm = await Form.compareFormHeader(itemName + ': Update', formHeader);
  //   if (!correctForm) {
  //     throw 'The edit form for - ' + itemName + ' was not displayed, the form - ' + formHeader + ' was shown instead';
  //   }

  //   await Form.fill(formSchemaWithValues);

  //   const submitButton = await FormPO.getOkButton();
  //   await submitButton.click();
    
  //   await ElementIs.stale(formPanel);

  //   browser.params.editedItemDetails[itemName] = rawItemValues;
  // }

  // static async deleteItem(itemName: string) {
  //   const tableConfig = ItemHelper.getItemConfig(itemName).tableConfig;

  //   let randomItem: any = await ReportingDB.getItemTableData(itemName, tableConfig);

  //   const randomIndex = ItemHelper.randomWholeNumber(0, randomItem.length - 1);
    
  //   randomItem = randomItem[randomIndex];

  //   await ElementIs.present(ItemListPO.getTableRows().get(randomIndex));
  //   const tableRows = await ItemListPO.getTableRows().get(randomIndex);
  //   const radioButton = await tableRows.element(by.css('.RadioButton span'));
  //   await radioButton.click();

  //   const deleteButton = await ToolbarPO.getDeleteButton();
  //   await deleteButton.click();

  //   const dialog = await ToolbarPO.getDialog();
  //   const yesDialogButton = await ToolbarPO.getDialogYesButton();
  //   await yesDialogButton.click();

  //   await ElementIs.stale(dialog);
  // }

  // static async appendItemIDs(itemName: string, rawItemValues: string) {
  //   const itemValues = await ReportingDB.getItemIDs(itemName, rawItemValues);
  //   return Object.assign(itemValues, rawItemValues);
  // }

}
