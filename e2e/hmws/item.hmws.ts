import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm, FormField } from './itemForm.hmws';

export abstract class Item {
    // list: ItemList;
    // details: ItemDetails;
    // toolbar: ItemToolbar;
    formFields: FormField[];

    constructor(formFields: FormField[]){
        this.formFields = formFields;
    }

    abstract testData(index?: number): Item;

    buildFormData(): FormField[]{
        const data = this.testData();
        this.formFields.forEach((value, index) =>{
            this.formFields[index].value = data[value.key]
        });
        return this.formFields;
    }

    // constructor(
    //     param : {
    //         itemList?: ItemList,
    //         itemDetails?: ItemDetails,
    //         itemToolbar?: ItemToolbar,
    //         itemForm?: ItemForm
    // }) {
    //     if (param.itemDetails) {
    //         this.details = new ItemDetails();
    //     }

    //     if (param.itemToolbar) {
    //         this.toolbar = new ItemToolbar();
    //     }

    //     if(param.itemForm) {
    //         this.form = param.itemForm;
    //     }

    //     if(param.itemList) {
    //         this.list = param.itemList;
    //     }
    // }
}