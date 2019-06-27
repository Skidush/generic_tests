import { browser, by, element, protractor } from 'protractor';
import { GetElement } from '../helpers/element-helpers';

export class ToolbarPO {

    static getNewButton() {
        return GetElement.byXPath('//p-toolbar//button[@id="New"]');
    }

    static getEditButton() {
        return GetElement.byXPath('//p-toolbar//button[@id="Edit"]');
    }

    static getDeleteButton() {
        return GetElement.byXPath('//p-toolbar//button[@id="Delete"]');
    }

    static getButton(buttonID: string) {
        return GetElement.byXPath('//p-toolbar//button[@id="' + buttonID + '"]');
    }

    static getDialog() {
        return GetElement.byCss('webuilib-item-toolbar p-dialog div[role="dialog"]');
    }

    static getDialogMsg() {
        return GetElement.byCss('webuilib-item-toolbar p-dialog div[role="dialog"] div.ui-dialog-content');
    }

    static getDialogYesButton() {
        return GetElement.byCss('webuilib-item-toolbar p-dialog div[role="dialog"] div.ui-dialog-footer p-footer button[label="Yes"]');
    }

    static getDialogNoButton() {
        return GetElement.byCss('webuilib-item-toolbar p-dialog div[role="dialog"] div.ui-dialog-footer p-footer button[label="No"]');
    }

}