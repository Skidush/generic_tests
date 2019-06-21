import { FormField } from './itemForm.hmws';

export abstract class Item {
    readonly itemDomain: string;
    formFields: FormField[];
    private _currentTestIndex: number;

    constructor(itemDomain: string, formFields: FormField[]){
        this.itemDomain = this.getStandardDomain(itemDomain);
        this.formFields = formFields;
    }

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
            else{
                result += `/${part}`
            }
        });
        return result;
    }

}