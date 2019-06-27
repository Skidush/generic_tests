import { GetElement } from '../helpers/element-helpers';

export class DetailsPO {

    private static detailsPanel(itemName: string) {
        return GetElement.byXPath('//webuilib-outcome-view/div/div/p-panel[@ng-reflect-header="' + itemName + '"]');
    }

    static async getFieldDetail(fieldID) {
        const field = await GetElement.byXPath('//webuilib-outcome-view//webuilib-uuid-link[@id="' + fieldID + '"]');
        const fieldText = await field.getText();

        return fieldText;
    }

}