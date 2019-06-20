import { by, element, ElementFinder, ElementArrayFinder, protractor, browser } from 'protractor';
import { GetElement, ElementIs } from './element-helpers';
import { ItemHelper } from './test-helpers';

export class Form {
  /**
   * Clears the text (not value) of the specified input field
   *
   * @param field the field
   */
  // TODO Move to field class if created
  static async clearField(field: ElementFinder) {
    await field.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
    await field.sendKeys(protractor.Key.BACK_SPACE);
  }

  /**
   * Fills a form based on the schema
   *
   * @param schema schema of the form
   * @param timer the time to wait for the form elements in milliseconds
   */
  static async fill(schema: any, timer?: number) {
    timer = ItemHelper.checkAndGetTimer(timer);

    for (let details of schema) {
      //await browser.sleep(800); //TODO:TOFIX
      details.el = await GetElement.byID(details.ID, timer);
      switch (details.field) {
        case 'input':
          await Form.clearField(details.el);
          await details.el.sendKeys(details.value);
          break;
        case 'dropdown':
          schema.el = await GetElement.byXPath('//p-dropdown[@id=\"' + details.ID + '\"]//span[@class="ui-dropdown-trigger-icon ui-clickable pi pi-caret-down"]', timer);
          await schema.el.click();
          if (details.value !== 'random') {
            const dropdownList = element.all(by.className('ui-dropdown-item'));
            const dropdownVal = await GetElement.byCSSWithExactText(dropdownList, details.value, timer);
            await dropdownVal.click();
          } else {
            let dropdownList = element.all(by.className('ui-dropdown-item'));
            await ElementIs.present(dropdownList.first(), timer);

            const listCount = await dropdownList.count();
            dropdownList = await dropdownList.get(ItemHelper.randomWholeNumber(1, listCount - 1));

            await dropdownList.click();
          }
          break;
          //TODO other fields (Date, etc.)
      }
    }
  }

  /**
   * Compares the form header with the specified text
   *
   * @param formName expected name of the form
   * @param formHeader element of the form header
   *
   * @returns a promise that represents the equivalence of the form header with the specified text
   */
  static async compareFormHeader(formName: string, formHeader: ElementFinder) {
    const formHeaderText = await formHeader.getText();

    return formName === formHeaderText;
  }
}