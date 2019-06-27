import { browser, by, element, protractor } from 'protractor';
import { GetElement } from '../helpers/element-helpers';

export class FormPO {

    static getOkButton() {
        return GetElement.byXPath('//webuilib-item-job-form//button[@id="OK"]');
    }

    static getDismissButton() {
        return GetElement.byXPath('//webuilib-item-job-form//button[@id="Dismiss"]');
    }

    static getFormName() {
        return GetElement.byXPath('//webuilib-item-job-form//h2')
    }

    static getFormPanel() {
        return GetElement.byTagName('webuilib-item-job-form');
    }

}