export class ItemList {
    columns: Array<String>;
    selectedColumns: Array<String>;
    filters: object;

    constructor(columns: Array<String>, selectedColumns: Array<String>, filters: object) {
        this.columns = columns;
        this.selectedColumns = selectedColumns;
        this.filters = filters;
    }
}