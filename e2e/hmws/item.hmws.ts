import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm, FormField } from './itemForm.hmws';

export abstract class Item {
    readonly domain: string;
    readonly domainIdentifer: string;
    list: ItemList;
    details: ItemDetails;
    // toolbar: ItemToolbar;
    formFields: FormField[];
    pluralName: string;

    constructor(domainProps: Array<string>, pluralName: string, formFields: FormField[],
        optional?: {
            itemList?: ItemList,
            itemDetails?: ItemDetails
        }){
        this.domain = this.getStandardDomain(domainProps[0]);
        this.domainIdentifer = domainProps[1];
        this.formFields = formFields;
        this.pluralName = pluralName;
        
        if (optional) {
            this.list = optional.itemList;
            this.details = optional.itemDetails;
        }
    }

    abstract getUrl(): string;
    abstract getUrlIdentifier(): string;
    abstract testData(index?: number): Item;

    buildFormData(): FormField[]{
        const data = this.testData();
        this.formFields.forEach((value, index) =>{
            this.formFields[index].value = data[value.key]
        });
        return this.formFields;
    }

    private getStandardDomain(itemDomain: string): string {
        const parts = itemDomain.split('/');
        let result;
        parts.forEach((part, index) => {
            if(index === 0) {
                result = part;
            }
            else {
                result += `/${part}`
            }
        });
        return result;
    }
}