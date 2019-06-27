export enum TableSelector {
    ROW = 'Row',
    RADIOBUTTON = 'Radio Button'
}

export class ItemList {
    columns: Array<String>;
    orderBy: Array<String>
    selectedColumns: Array<String>;
    selector: string;
    pageRows: number;

    constructor(params: {
            columns: Array<String>, 
            orderBy: Array<String>,
            selector: TableSelector;
            selectedColumns?: Array<String>, 
            filters?: object,
        }) {
        this.columns = params.columns;
        this.orderBy = params.orderBy
        this.selector = params.selector;
        this.pageRows = 40;
        this.selectedColumns = params.selectedColumns;
    }
}