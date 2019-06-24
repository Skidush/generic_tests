import { browser, protractor } from 'protractor';

const EC = protractor.ExpectedConditions;
const defaultTimer = browser.params.defaultTimer;
const root = browser.params.testsPath;
const baseUrl = browser.baseUrl;

const _ = require('lodash');
const fs = require('fs');
const http = require('request');

export class ItemHelper {
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
   * Transforms the string into uppercase with no spaces
   *
   * @param string the string to be transformed
   * 
   * @returns a string transformed to uppercase with no spaces
   */
  static toUpperCaseTrimmed(string: string) {
    return string.replace(/\s+/g, "").toUpperCase();
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
    timer = ItemHelper.checkAndGetTimer(timer);
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