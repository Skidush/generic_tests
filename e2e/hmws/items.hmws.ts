import { FormField } from './itemForm.hmws';
import { browser } from 'protractor';
import { ItemHelpers } from '../helpers/test-helpers';
import { Item } from './item.hmws';

export namespace HMWSItems{
    export class Skill extends Item {
        name: string;
        description: string;

        constructor() {
            const formFields: FormField[] = [
                {ID: 'Name',        field: 'input', key: 'name'},
                {ID: 'Description', field: 'input', key: 'description'}
            ];

            super('hmws/skills',formFields);
        }

        initializeTestData(index?: number): { item: Skill; index: number; } {
            const skills = <Skill[]>[
                {name: 'Fly', description: 'Fly like a bird'},
                {name: 'Walk', description: 'Walk like a human'}
            ];

            const num = index | ItemHelpers.randomWholeNumber(0,skills.length-1);
            const test = skills[num]
            Object.keys(test).forEach(key =>{
                this[key] = test[key];
            });
            return {item: this, index: num};
        }



        getUrl(): string{
            return `${browser.baseUrl}/#/${this.itemDomain}/${encodeURI(this.name)}`
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

            super('hmws/machines',formFields);
        }

        initializeTestData(index?: number): { item: Machine; index: number; } {
            const machines = <Machine[]>[
                {name: 'Supaer Machine', model: 'SPMCHN-123', serialNumber: '321-NHCMPS'},
                {name: 'Washing Machine', model: 'WASHMAN321', serialNumber: '123NAMHSAW'}
            ];

            const num = index | ItemHelpers.randomWholeNumber(0,machines.length-1);
            const test = machines[num]
            Object.keys(test).forEach(key =>{
                this[key] = test[key];
            });
            return {item: this, index: num};
        }

        getUrl(): string{
            return `${browser.baseUrl}/#/${this.itemDomain}/${encodeURI(this.name)}`
        }
    }

}