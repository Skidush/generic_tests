
import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm, FormField } from './itemForm.hmws';
import { Schema } from 'inspector';
import { Item } from './item.hmws';


// export class Company extends Item {

//     constructor() {
//         super(
//             {
//                 itemForm: new ItemForm([{
//                     id: 'name';
//                 }])
//             }
//         );
//     }
// }

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

        getTestData(index?: number): Skill{
            const skills = <Skill[]>[
                {name: 'Fly', description: 'Fly like a bird'},
                {name: 'Walk', description: 'Walk like a human'}
            ];
            const num = index | Math.ceil(Math.random() * (skills.length - 1));
            return skills[num];
        }

        getUrl(): string{
            return `${this.itemDomain}/${name}`
        }
    }

    // export class Machine extends Item{
    //     name:string;
    //     model:string;
    //     serialNumber:string;

    //     constructor(){
    //         const formFields: FormField[] = [
    //             {ID:'Name', field: 'input', key: 'name'}
    //         ];

    //         super(formFields)
    //     }

    //     testData(index?: number): Machine {
    //         const skills = <Machine[]>[
    //             {name: 'Machine 1', model: 'Robocop', serialNumber: 'RBC-123'}
    //         ];
    //         const num = index | Math.ceil(Math.random() * (skills.length - 1));
    //         return skills[num];
    //     }
    // }
}