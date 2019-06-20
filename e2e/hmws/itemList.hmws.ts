export class ItemList {
    columns: Array<String>;
    orderBy: Array<String>
    selectedColumns: Array<String>;
    filters: object;
    pageRows: number;

    constructor(params: {
            columns: Array<String>, 
            orderBy: Array<String> 
            selectedColumns?: Array<String>, 
            filters?: object,
        }) {
        this.columns = params.columns;
        this.orderBy = params.orderBy
        this.pageRows = 40;
        
        this.selectedColumns = params.selectedColumns;
        this.filters = params.filters;
    }
}