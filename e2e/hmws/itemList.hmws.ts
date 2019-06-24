export enum tableSelector {
    ROW = 'Row',
    RADIOBUTTON = 'Radio Button'
}

export class ItemList {
    columns: Array<String>;
    orderBy: Array<String>
    selectedColumns: Array<String>;
    selector: String;
    pageRows: number;

    constructor(params: {
            columns: Array<String>, 
            orderBy: Array<String>,
            selector: tableSelector;
            selectedColumns?: Array<String>, 
            filters?: object,
        }) {
        this.columns = params.columns;
        this.orderBy = params.orderBy
        this.pageRows = 40;
        
        this.selectedColumns = params.selectedColumns;
    }
}