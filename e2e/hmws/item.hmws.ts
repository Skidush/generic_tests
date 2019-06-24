import { FormField } from './itemForm.hmws';
import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';

export abstract class Item {
    readonly domain: string;
    readonly domainIdentifer: string;
    list: ItemList;
    details: ItemDetails;
    // toolbar: ItemToolbar;
    formFields: FormField[];
    pluralName: string;

    private _currentTestIndex: number;
    constructor(domain: string, domainIdentifier: string, pluralName: string, formFields: FormField[],
        optional?: {
            itemList?: ItemList,
            itemDetails?: ItemDetails
        }){
        this.domain = this.getStandardDomain(domain);
        this.domainIdentifer = domainIdentifier;
        this.formFields = formFields;
        this.pluralName = pluralName;

        if (optional) {
            this.list = optional.itemList;
            this.details = optional.itemDetails;
        }
    }

    abstract getUrlIdentifier(): string;
    abstract initializeTestData(index?: number): {item: Item, index:number};
    abstract getUrl(): string;

    get currentTestIndex(): number{
        if(Number.isInteger(this._currentTestIndex)){
            return this._currentTestIndex;
        }
        throw('currentTestIndex is undefined. Try to invoke `buildFormData()` or set it explicitly.');
    }

    set currentTestIndex(index: number) {
        this._currentTestIndex = index;
    }

    buildFormData(): FormField[]{
        const data = this.initializeTestData();
        this.currentTestIndex = data.index;
        this.formFields.forEach((value, index) =>{
            this.formFields[index].value = data.item[value.key]
        });
        return this.formFields;
    }

    static convert<T extends Item>(castedItem: T, type: {new(): T}): T{
        let item = new type();
        Object.keys(castedItem).forEach(key =>{
            item[key] = castedItem[key];
        });
        return item;
    }

    private getStandardDomain(itemDomain: string): string{
        const parts = itemDomain.split('/');
        let result;
        parts.forEach((part,index) => {
            if(index === 0){
                result = part;
            }
            else {
                result += `/${part}`
            }
        });
        return result;
    }
}