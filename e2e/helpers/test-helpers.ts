import { browser, protractor } from 'protractor';

const EC = protractor.ExpectedConditions;
const defaultTimer = browser.params.defaultTimer;
const root = browser.params.testsPath;
const baseUrl = browser.baseUrl;

const _ = require('lodash');
const fs = require('fs');
const http = require('request');

export class Item {
  /**
   * Checks if a timer has been defined, returns the default timer if not defined
   * @param timer the time to wait
   * 
   * @returns the timer if defined, else the default timer in the protractor configuration
   */
  static checkAndGetTimer(timer: number) {
    return timer ? timer : defaultTimer;
  }

  /**
   * Generates a whole random number based on the given range
   *
   * @param min the minimum value for the range
   * @param max the maximum value for the range
   * 
   * @returns a random whole number
   */  
  static randomWholeNumber(min: number, max: number) {
    return _.random(min, max);
  }

  /**
   * Sets the values of the form schema from the form values data
   *
   * @param formSchema the schema for the form of the item
   * @param formValues the values for each of the element of the form
   * 
   * @returns the form schema with set values
   */    
  static setFormValues(formSchema: Array<any>, formValues: Array<any>) {
    const randIndex = Math.floor(Math.random() * formValues.length);
    for (let formField of formSchema) {  
        let valueKey;
        Object.keys(formField).forEach(key => {
          valueKey = Object.keys(formValues[randIndex]).find((keys) => keys.toUpperCase() === formField[key].toUpperCase());

          if (valueKey !== undefined) {
            formField['value'] = formValues[randIndex][valueKey];
          }
        });
    }
    return formSchema;
  }

  /**
   * Retrieves the values of the item
   *
   * @param itemName the name of the item
   * 
   * @returns the values of the item in JSON
   */  
  static getItemValues(itemName: string) {
    const rawData = fs.readFileSync(root + '/data/' + itemName + '/values.td.json');
    const values = JSON.parse(rawData);
    return values[itemName];
  }

  /**
   * Retrieves the url of the created item
   *
   * @param itemName the name of the item
   * @param itemData the data of the created item
   * 
   * @returns the url of the created item
   */  
  static getItemUrl(itemName: string, itemData: any) {
    let itemBaseUrl = Item.getItemConfig(itemName).url;
    const url = itemBaseUrl.split('/');
    const urlItemID = url[url.length - 1];

    switch (urlItemID) {
      case '{name}':
        itemBaseUrl = itemBaseUrl.replace('{name}', itemData['Name']);
        break;
      case '{ID}':
        itemBaseUrl = itemBaseUrl.replace('{ID}', itemData['ID']);
    }

    return itemBaseUrl;
  }

  /**
   * Retrieves the configuration of the item
   *
   * @param itemName the name of the item
   * 
   * @returns the configuration of the item in JSON
   */  
  static getItemConfig(itemName: string) {
    const rawData = fs.readFileSync(root + '/data/' + itemName + '/itemConfiguration.json');
    return JSON.parse(rawData);
  }

  /**
   * Retrieves the schema of the item with defined values
   * 
   * @param itemName the name of the item
   * 
   * @returns the schema of the item with defined values in JSON
   */
  static getFormSchemaWithValues(itemName: string) {
    const itemValues = Item.getItemValues(itemName);
    const formSchema = Item.getItemConfig(itemName).schema;
    return Item.setFormValues(formSchema, itemValues);
  }

  /**
   * Parses the schema with defined values into a user readable JSON
   * 
   * @param formSchemaWithValues the schema with values of the item
   * 
   * @returns the values of the item in JSON with the corresponding IDs as keys
   */
  static getRawValues(formSchemaWithValues: any) {
    let itemValues = {};
    for (const entry of formSchemaWithValues) {
      let itemValueKey;
      Object.keys(entry).forEach(key => {
        if (key === "ID") {
          itemValueKey = _.startCase(entry[key]);
        } else if (itemValueKey && key === "value") {
          itemValues[itemValueKey] = entry[key];
        }
      });
    }
    return itemValues;
  }
}

export class Application {
  
  /**
   * Checks if the user has been redirected from a url to another
   *
   * @param oldUrl the url before redirection
   * @param newUrl the url after redirection
   * @param timer the time to wait for the redirection to occur in milliseconds
   * 
   * @returns a promise that represent if the user has been redirected
   */  
  static isRedirected(oldUrl: string, newUrl: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    return browser.wait(EC.urlIs(newUrl), timer).then(() => {
      if (oldUrl === newUrl) {
        return false;
      }
      return true;
    }, () => { 
      return false;
    });
  }
}