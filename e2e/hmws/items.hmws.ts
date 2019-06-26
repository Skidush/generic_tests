
import { ItemList, tableSelector } from './itemList.hmws';
import { ItemDetails, outcome } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm, FormField } from './itemForm.hmws';
import { Item } from './item.hmws';
import { browser } from 'protractor';
import { ItemHelpers } from '../helpers/test-helpers';

export namespace HMWSItems{
    export class Company extends Item{
        name: string;
        longName: string;
        ABN: string;

        constructor() {
            const formFields: FormField[] = [
                {ID: 'Name',        field: 'input', key: 'name'},
                {ID: 'LongName',    field: 'input', key: 'longName'},
                {ID: 'ABN',         field: 'input', key: 'ABN'},
            ];

            const itemList = new ItemList({
                columns: ['Name', 'Long Name', 'ABN', 'Phone', 'Email', 'State'],
                orderBy: ['NAME', 'ASC'],
                selector: tableSelector.RADIOBUTTON
            });

            const itemDetails = new ItemDetails({
                outcome: {
                    Name: outcome.FIELD,
                    'Long Name': outcome.FIELD,
                    ABN: outcome.FIELD,
                    Phone: outcome.TABLE,
                    Email: outcome.TABLE
                }
            });

            super(
                'hmws/companies',
                'name',
                'Company',
                'Companies',
                formFields,
                {
                    itemList: itemList,
                    itemDetails: itemDetails
                }
            );
        }

        initializeTestData(index?: number): { item: Company; index: number; } {
            const companies = <Company[]>[
                {name: 'EC', longName: 'Evil Corp', ABN: 'ABN'},
                {name: 'V2', longName: 'Vaklang 2woh', ABN: 'ABN'}
            ];

            const num = index ? index : ItemHelpers.randomWholeNumber(0, companies.length-1);
            const test = companies[num]
            Object.keys(test).forEach(key =>{
                this[key] = test[key];
            });
            return {item: this, index: num};
        }

        getUrl(): string {
            return `${browser.baseUrl}/#/${this.domain}/${encodeURI(this.name)}`;
        }

        getUrlIdentifier(): string {
            return this.domainIdentifer;
        }
    }

    export class Skill extends Item {
        name: string;
        description: string;

        constructor() {
            const formFields: FormField[] = [
                {ID: 'Name',        field: 'input', key: 'name'},
                {ID: 'Description', field: 'input', key: 'description'}
            ];

            const itemList = new ItemList({
                columns: ['Name', 'Description', 'State'],
                orderBy: ['NAME', 'ASC'],
                selector: tableSelector.RADIOBUTTON
            });

            const itemDetails = new ItemDetails({
                outcome: {
                    Name: outcome.FIELD,
                    Description: outcome.FIELD,
                }
            });

            super(
                'hmws/skills',
                'name',
                'Skill',
                'Skills',
                formFields,
                {
                    itemList: itemList,
                    itemDetails: itemDetails
                }
                );
        }

        initializeTestData(index?: number): { item: Skill; index: number; } {
            const skills = <Skill[]>[
                {name: 'Fly', description: 'Fly like a bird'},
                {name: 'Walk', description: 'Walk like a human'}
            ];

            const num = index ? index : ItemHelpers.randomWholeNumber(0,skills.length-1);
            const test = skills[num]
            Object.keys(test).forEach(key =>{
                this[key] = test[key];
            });
            return {item: this, index: num};
        }

        getUrl(): string{
            return `${browser.baseUrl}/#/${this.domain}/${encodeURI(this.name)}`
        }

        getUrlIdentifier(): string {
            return this.domainIdentifer;
        }
    }

    export class Machine extends Item {
        name: string;
        model: string;
        serialNumber: string;

        constructor() {
            const formFields: FormField[] = [
                {ID: 'Name',         field: 'input', key: 'name'},
                {ID: 'Model',        field: 'input', key: 'model'},
                {ID: 'SerialNumber', field: 'input', key: 'serialNumber'}
            ];

            const itemList = new ItemList({
                columns: ['Name', 'Model', 'Serial Number', 'State'],
                orderBy: ['NAME', 'ASC'],
                selector: tableSelector.RADIOBUTTON
            });

            const itemDetails = new ItemDetails({
                outcome: {
                    Name: outcome.FIELD,
                    Model: outcome.FIELD,
                    'Serial Number': outcome.FIELD,
                }
            });

            super(
                'hmws/machines',
                'name',
                'Machine',
                'Machines',
                formFields,
                {
                    itemList: itemList,
                    itemDetails: itemDetails
                }
            );
        }

        initializeTestData(index?: number): { item: Machine; index: number; } {
            const machines = <Machine[]>[
                {name: 'Supaer Machine', model: 'SPMCHN-123', serialNumber: '321-NHCMPS'},
                {name: 'Washing Machine', model: 'WASHMAN321', serialNumber: '123NAMHSAW'}
            ];

            const num = index ? index : ItemHelpers.randomWholeNumber(0,machines.length-1);
            const test = machines[num]
            Object.keys(test).forEach(key =>{
                this[key] = test[key];
            });
            return {item: this, index: num};
        }

        getUrl(): string{
            return `${browser.baseUrl}/#/${this.domain}/${encodeURI(this.name)}`
        }

        getUrlIdentifier(): string {
            return this.domainIdentifer;
        }
    }
}