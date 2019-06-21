export interface FormField {
    ID: string;
    field: 'input'|'dropdown';
    key: string;
    value?: string;
}

[ { ID: 'Name', field: 'input', value: 'IS01_Test' },
  { ID: 'LongName', field: 'input', value: 'iSensors Inc._Test' },
  { ID: 'ABN', field: 'input', value: 'ABN' } ]

export class ItemForm {
    schema: Array<FormField>;

    constructor(schema: Array<FormField>) {
        this.schema = schema;
    }
}