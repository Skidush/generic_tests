
import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm, FormField } from './itemForm.hmws';
import { Item } from './item.hmws';
import { browser } from 'protractor';

export namespace HMWSItems{
    export class Company extends Item {
        name: string;
        longName: string;
        ABN: string;
        
        constructor() {
            const formFields: FormField[] = [
                {ID: 'Name',        field: 'input', key: 'name'},
                {ID: 'LongName',    field: 'input', key: 'longName'},
                {ID: 'ABN',         field: 'input', key: 'ABN'},
            ];
            super(
                ['hmws/companies', 'name'],
                "Companies",
                formFields, 
                { 
                    itemList: new ItemList({
                        columns: ['Name', 'Long Name', 'ABN', 'Phone', 'Email', 'State'],
                        orderBy: ['NAME', 'ASC']
                    })  
                }
            );
        }

        testData(index?: number): Company{
            const companies = <Company[]>[
                {name: 'EC', longName: 'Evil Corp', ABN: 'ABN'},
                {name: 'V2', longName: 'Vaklang 2woh', ABN: 'ABN'}
            ];
            const num = index | Math.ceil(Math.random() * (companies.length - 1));
            return companies[num];
        }

        getUrl(): string {
            return `${browser.baseUrl}/#/${this.domain}/${encodeURI(this.name)}`;
        }

        getUrlIdentifier(): string {
            return this.domainIdentifer;
        }
    }
}