import { browser, by, element, protractor } from 'protractor';

export class GenericPO {

  // Data
  randomNum(min: number, max: number) {
    return Math.ceil((Math.random() * (max - min) + min));
  }

  randomLetters(length: number) {
    let letters = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const characters = alphabet;

    for (let i = 0; i < length; i++) {
      letters += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return letters;
  }

  randomString(length: number) {
    let string = '';
    const numbers = '1234567890';
    const symbols = '`~!@#$%^&*()-_=+[]{}\\/;:,.<>?\'\" ';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const characters = numbers + symbols + letters;

    for (let i = 0; i < length; i++) {
      string += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return string;
  }

  elementById(elementID: string) {
    return element(by.id(elementID));
  }

  // Navigation
  get refreshPage() {
    return browser.refresh();
  }

  navigateTo(path: string) {
    return browser.get(path);
  }

  // Buttons
  get toolbar() {
    return element.all(by.css('.ui-toolbar'));
  }

  button(buttonID: string) {
    return element(by.id(buttonID));
  }

  collectionsButton(buttonID: string) {
    return element.all(by.id(buttonID));
  }

  menuItemBtn(item: string) {
    return element(by.cssContainingText('.ui-menuitem-link', item));
  }

  // Forms
  get formHeader() {
    return element(by.css('h2'));
  }

  get progressbar() {
    return element(by.css('.ui-progressbar'));
  }

  get datePicker() {
    return element(by.css('.ui-datepicker'));
  }

  get datePickerTrigger() {
    return element.all(by.css('.ui-datepicker-trigger'));
  }

  inputDateField(fieldPlaceholder: string) {
    return element(by.css('[placeholder="' + fieldPlaceholder + '"'));
  }

  inputField(fieldID: string) {
    return element(by.css('input[id="' + fieldID + '"]'));
  }

  searchField(fieldPlaceholder: string) {
    return element(by.css('input[placeholder="' + fieldPlaceholder + '"]'));
  }

  datePickerBtn(button: string) {
    return element(by.css('[ng-reflect-label="' + button + '"]'));
  }

  formDropdown(dropdownID: string) {
    return element(by.id(dropdownID));
  }

  formDropdownByXPath(dropdownID: string) {
    return element(by.xpath("//p-dropdown[@id='" + dropdownID + "']//span[@ng-reflect-ng-class='pi pi-caret-down']"));
  }

  formDropdownValueByXPath(dropdownID: string) {
    return element(by.xpath("//p-dropdown[@id='" + dropdownID + "']//div//input"));
  }

  formDropdownValues(value?: string) {
    if (value) {
      return element.all(by.cssContainingText('.ui-dropdown-item', value));
    } else {
      return element.all(by.css('.ui-dropdown-item'));
    }
  }

  formDropdownValue(value?: string) {
    return element(by.cssContainingText('.ui-dropdown-item', value));
  }

  errorMsgForm(errorMsg?: string) {
    if (errorMsg) {
      return element(by.cssContainingText('span', errorMsg));
    } else {
      return element(by.css('.ui-messages-detail'));
    }
  }

  formButton(button: string) {
    return element(by.cssContainingText('button', button));
  }

  // Table / Item details
  get tableLoading() {
    return element(by.css('.ui-table-loading'));
  }

  tableRow(rowData: string) {
    return element(by.cssContainingText('webuilib-uuid-link', rowData));
  }

  get tableHeader() {
    return element.all(by.tagName('th'));
  }

  tableRows(rowID?: string) {
    if (rowID) {
      return element.all(by.cssContainingText('tr', rowID));
    }

    return element.all(by.tagName('tr'));
  }

  radioButton() {
    return element.all(by.tagName('p-tableradiobutton'));
  }

  dialogTableRows(rowID?: string) {
    if (rowID) {
      return element.all(by.cssContainingText('.ui-dialog tr', rowID));
    }

    return element.all(by.tagName('.ui-dialog tr'));
  }

  tableRowData(rowContent: string) {
    return element(by.cssContainingText('td', rowContent));
  }

  tabViewDetails(tabData?: string) {
    if (tabData) {
      return element.all(by.cssContainingText('webuilib-uuid-link', tabData));
    }

    return element.all(by.tagName('webuilib-uuid-link'));
  }

  // Dialog
  get dialog() {
    return element(by.css('.ui-dialog-content'));
  }

  dialogBtn(button: string) {
    return element(by.cssContainingText('.ui-dialog .ui-button-text', button));
  }

  // General
  header(headerText?: string) {
    if (headerText) {
      return element(by.cssContainingText('h1', headerText));
    } else {
      return element(by.css('h1'));
    }
  }

  get greyArea() {
    return element(by.css('.ui-widget-overlay'));
  }

  // Multiselect
  get multiselect() {
    return element.all(by.tagName('p-multiselect'));
  }

  get multiselectItem() {
    return element.all(by.className('ui-multiselect-item'));
  }

  get multiselectClose() {
    return element(by.className('ui-multiselect-close'));
  }

  getElementUsingCss( cssSelector: string, text: string ) {
    return element(by.cssContainingText(cssSelector, text));
  }

  getAllElementUsingCss( cssSelector: string, text: string ) {
    return element.all(by.cssContainingText(cssSelector, text));
  }

  errorMsgGrowl(errorMsg?: string) {
    if (errorMsg) {
      return element(by.cssContainingText('.ui-growl-message', errorMsg));
    } else {
      return element(by.css('.ui-growl-message'));
    }
  }

  get formCloseButton(){
    return element(by.className('ui-sidebar-close'));
  }

  sendKeys(inputId: string, value: string){
    this.inputField(inputId).clear().then(() => {
      this.inputField(inputId).sendKeys(value);
    });
  }
}
