import { browser, element, by } from "protractor";

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

    let retVal = Object.keys(itemNames).find(key => itemNames[key] === itemNamePlural);
    // If undefined, it probably isn't defined or the item name is already singular
    if (!retVal) {
      return retVal;
    }

    return retVal;
  }
}
