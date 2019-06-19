import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm } from './itemForm.hmws';

export class Item {
    list: ItemList;
    details: ItemDetails;
    toolbar: ItemToolbar;
    form: ItemForm;

    constructor(
        param : {
            itemList?: ItemList,
            itemDetails?: ItemDetails,
            itemToolbar?: ItemToolbar,
            itemForm?: ItemForm
    }) {
        if (param.itemDetails) {
            this.details = new ItemDetails();
        }

        if (param.itemToolbar) {
            this.toolbar = new ItemToolbar();
        }

        if(param.itemForm) {
            this.form = param.itemForm;
        }

        if(param.itemList) {
            this.list = param.itemList;
        }
    }
}