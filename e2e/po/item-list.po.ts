import { by, element } from 'protractor';
import { GetElement } from '../helpers/element-helpers';

export class ItemListPO {

    static getTableHeader() {
        return GetElement.byXPath('//p-table//thead//tr[1]');
    }

    static getColumn(columnName: string) {
        return GetElement.byID(columnName + '-column');
    }

    static getTableRows() {
        return element.all(by.css('p-table tbody tr'));
    }

    static async getItemRow(tableRowData: string) {
        const rowID = ItemListPO.getTableRows();
        return await GetElement.byCSSWithExactText(rowID, tableRowData);
    }

    static getRadioButton() {
        return element(by.className('RadioButton'));
    }
}