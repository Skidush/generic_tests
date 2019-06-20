import { browser, by, element, protractor } from 'protractor';

export class LoginPage {

  get username() {
    return element(by.id('username'));
  }

  get password() {
    return element(by.id('password'));
  }

  get password1() {
    return element(by.id('float-input1'));
  }

  get password2() {
    return element(by.id('float-input2'));
  }
}
