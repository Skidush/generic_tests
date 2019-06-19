import { Item } from './item.hmws';
import { ItemList } from './itemList.hmws';
import { ItemDetails } from './itemDetails.hmws';
import { ItemToolbar } from './itemToolbar.hmws'
import { ItemForm } from './itemForm.hmws';

export class Company extends Item {
    constructor() {
        super(
            {itemForm: new ItemForm({test: 't3'})}
        );
    }
}

export class Skills extends Item {
    constructor() {
        super(
            {itemForm: new ItemForm({test: 'skills'})}
        );
    }
}