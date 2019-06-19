import {
  by,
  element,
  ElementFinder,
  ElementArrayFinder,
  protractor,
  browser
} from "protractor";
import { Item } from "./test-helpers";

const EC = protractor.ExpectedConditions;

export class ElementIs {
  /**
   * Retrieves the presence of the element
   * Recommended to use when looking for an element
   *
   * @param el the element being tested
   * @param timer the time, in milliseconds, for waiting the element to meet the condition
   *
   * @returns a promise that will represent the presence of the element
   */

  static present(el: ElementFinder, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    return browser.wait(EC.presenceOf(el), timer).catch(err => {
      err = err.toString().split(":");
      throw "No element found " +
        el.parentElementArrayFinder.locator_ +
        "." +
        err[1];
    });
  }

  /**
   * Retrieves the staleness of the element
   * Recommended to use when looking for an element
   *
   * @param el the element being tested
   * @param timer the time, in milliseconds, for waiting the element to meet the condition
   *
   * @returns a promise that will represent the staleness of the element
   */
  static stale(el: ElementFinder, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    return browser.wait(EC.stalenessOf(el), timer).catch(err => {
      err = err.toString().split(":");
      throw "Element " +
        el.parentElementArrayFinder.locator_ +
        " still exists in the DOM. " +
        err[1];
    });
  }

  /**
   * Retrieves the clickability of element
   * Recommended to use when sending an input or event to an element
   *
   * @param el the element being tested
   * @param timer the time, in milliseconds, for waiting the element to meet the condition
   *
   * @returns a promise that will represent the clickability of the element
   */

  static clickable(el: ElementFinder, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    return browser.wait(EC.elementToBeClickable(el), timer).catch(err => {
      err = err.toString().split(":");
      throw "Element " +
        el.parentElementArrayFinder.locator_ +
        " is not clickable." +
        err[1];
    });
  }
}

export class GetElement {
  /**
   * Retrieves the element with the specified ID
   *
   * @param id the ID of the element
   * @param timer the time to wait for the element in milliseconds
   *
   * @returns a promise that will represent the element with the specified ID
   */
  static async byID(id: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);

    const el = element(by.id(id));
    await ElementIs.present(el, timer);

    return el;
  }

  /**
   * Retrieves the element with the specified css and its containing text (not the exact text)
   *
   * @param css the css attribute of the element (e.g class, id, tag)
   * @param text the text contained by the css
   * @param timer the time to wait for the element in milliseconds
   * 
   * @returns a promise that represents the element with the specified css and its containing text
   */
  static async byCssContainingText(css: string, text: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    const el = element(by.cssContainingText(css, text));
    await ElementIs.present(el, timer);

    return el;
  }

  /**
   * Retrieves the element with the specified class name
   *
   * @param className the class name of the element
   * @param timer the time to wait for the element in milliseconds
   * 
   * @returns a promise that represents the element with the specified class name
   */
  static async byClassName(className: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    const el = element(by.className(className));
    await ElementIs.present(el, timer);

    return el;
  }

  /**
   * Retrieves the element with the specified css
   *
   * @param css the css of the element (e.g class, id, tag..)
   * @param timer the time to wait for the element in milliseconds
   * 
   * @returns a promise that represents the element with the specified css
   */

  static async byCss(css: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    const el = element(by.css(css));
    await ElementIs.present(el, timer);

    return el;
  }

  /**
   * Retrieves the element with the specified tag name
   *
   * @param tagName the css of the element (e.g class, id, tag..)
   * @param timer the time to wait for the element in milliseconds
   */

  static async byTagName(tagName: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);

    const el = element(by.tagName(tagName));
    await ElementIs.present(el, timer);

    return el;
  }

  /**
   * Retrieves the element with the specified css and its exact text
   *
   * @param el the element
   * @param text the inner text contained by the element
   * @param timer the time to wait for the element in milliseconds
   * 
   * @returns a promise representing the element with the exact text
   */
  static async byCSSWithExactText(el: ElementArrayFinder, text: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    await ElementIs.present(el.first(), timer);
    const elCount = await el.count();

    let element;
    for (let index = 0; index < elCount - 1; index++) {
      const elText = await el.get(index).getText();
      if (text === elText) {
        element = el.get(index);    
        break;
      }
    }

    if (!element) {
      throw 'No element found that contains the text: ' + text;
    }
  
    return element;
  }

  /**
   * Retrieves the element with the specified XPath
   *
   * @param XPath the XPath
   * @param timer the time to wait for the element in milliseconds
   *
   * @returns a promise that will represent the element with the specified XPath
   */
  static async byXPath(XPath: string, timer?: number) {
    timer = Item.checkAndGetTimer(timer);
    const el = element(by.xpath(XPath));
    
    await ElementIs.present(el, timer);

    return el;
  }
}

// TODO:
// Find a way to return an ElementArrayFinder (getElements) as a promise
// Source: https://stackoverflow.com/questions/46951900/cannot-create-async-method-which-return-elementarrayfinder-for-e2e-tests?rq=1