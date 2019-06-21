import { defineSupportCode, Before, setDefaultTimeout } from 'cucumber';
import { browser, protractor } from 'protractor';
import { LoginPage } from '../po/login.po';
import { GenericPO } from '../po/generic.po';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

defineSupportCode(({Given, When, Then, And}) => {

  let login:      LoginPage;
  let generic:     GenericPO;

  login =     new LoginPage();
  generic =   new GenericPO();

  const EC = protractor.ExpectedConditions;

  When('I enter {string} in username and {string} in password', function (username, password) {
    return (browser.wait(EC.presenceOf(login.username), browser.timeout)).then((present) => {
      login.username.sendKeys(username);
      login.password.sendKeys(password);
    }, (invisible) => {
      return expect.fail('The username field is not present in the DOM');
    });
  });

  Then('I should see the dashboard', function () {
    return browser.wait(EC.urlContains('/#/dashboard'), browser.timeout).then((contains) => {
      return true;
    }, (doesntContain) => {
      return expect.fail('You are not the dashboard page');
    });
  });

  Then('I should see the dashboard with change password dialog', function () {
    return browser.wait(EC.urlContains('/#/dashboard'), browser.timeout).then((contains) => {
      browser.wait(EC.presenceOf(generic.dialog), browser.timeout).then((present) => {
        return true;
      }, (absent) => {
        return expect.fail('The Change Password dialog did not appear');
      });
    }, (doesntContain) => {
      return expect.fail('You are not on the dashboard page');
    });
  });

  When('I enter {string} in password1 and {string} in password2', function (password1, password2) {
    return (browser.wait(EC.presenceOf(login.password1), browser.timeout)).then((present) => {
      login.password1.sendKeys(password1);
      login.password2.sendKeys(password2);
      // browser.sleep(2000);
    }, (invisible) => {
      return expect.fail('The username field is not present in the DOM');
    });
  });

  Then('I should see the dialog disappear', function () {
    return browser.sleep(5000).then(() => {
      generic.dialog.isPresent().then((present) => {
        return expect(present).to.be.false;
      }, (absent) => {
        return expect.fail('The dialog is not disappeared');
      });
    });
  });

});
