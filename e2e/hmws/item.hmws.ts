import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm, FormField } from './itemForm.hmws';

export abstract class Item {
    // list: ItemList;
    // details: ItemDetails;
    // toolbar: ItemToolbar;
    readonly itemDomain: string;
    formFields: FormField[];

    constructor(itemDomain: string, formFields: FormField[]){
        this.itemDomain = this.getStandardDomain(itemDomain);
        this.formFields = formFields;
    }

    abstract getTestData(index?: number): Item;
    abstract getUrl(): string;

    buildFormData(): FormField[]{
        const data = this.getTestData();
        this.formFields.forEach((value, index) =>{
            this.formFields[index].value = data[value.key]
        });
        return this.formFields;
    }

    private getStandardDomain(itemDomain: string): string{
        const parts = itemDomain.split('/');
        let result;
        parts.forEach((part,index) => {
            if(index === 0){
                result = part;
            }
            else{
                result += `/${part}`
            }
        });
        return result;
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