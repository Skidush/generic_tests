import { pgConnection } from "../../configurations/pgCon.conf";

const pg: pgConnection = new pgConnection();

export class ReportingDB {
  static async getItems(itemName: string, orderBy?: string, limit?: number) {
    orderBy = orderBy ? '"' + orderBy[0].toUpperCase() + '" ' + orderBy[1] : '"ID" ASC';
    itemName = itemName.toUpperCase().replace(/\s+/g, "");

    let query = 'SELECT * FROM public."' + itemName + '" ORDER BY ' + orderBy;
    query = limit ? query + " LIMIT " + limit : query;

    const results = await pg.query(query);

    return results.rows;
  }

  static async getItemTableData(itemName: string, tableConfig: any) {
    const tableColumns = tableConfig.tableColumns;
    const orderBy = tableConfig.orderBy;
    const maxRows = tableConfig.maxRows;

    itemName = itemName.toUpperCase().replace(/\s+/g, "");
    let querySelectors = [];

    tableColumns.forEach(column => {
      querySelectors.push('"' + column.toUpperCase().replace(/\s+/g, "") + '"');
    });

    const query =
      "SELECT " +
      querySelectors.join(", ") +
      ' FROM public."' +
      itemName +
      '"' +
      " ORDER BY " +
      '"' +
      orderBy[0].toUpperCase() +
      '" ' +
      orderBy[1] +
      " LIMIT " +
      maxRows;
    const results = await pg.query(query);

    return results.rows;
  }

  static async getItemIDs(itemName: string, createdItemDetails: any) {
    itemName = itemName.toUpperCase().replace(/\s+/g, "");
    const itemColumns = await ReportingDB.getTableColumns(itemName);
    let ID;
    let querySelectors = [];

    Object.keys(createdItemDetails).forEach(key => {
      querySelectors.push(
        '"' +
          key.toUpperCase().replace(/\s+/g, "") +
          "\" = '" +
          createdItemDetails[key] +
          "'"
      );
    });

    ID = itemColumns.indexOf('ID');
    ID = ID > 0 ? + ', "ID"' : '';

    const query =
      'SELECT "UUID"' + ID + ' FROM public."' +
      itemName +
      '" WHERE ' +
      querySelectors.join(" AND ");
    const results = await pg.query(query);
    return results.rows[0];
  }

  static async getTableColumns(itemName: string) {
    const query = 'SELECT * FROM public."' + itemName.toUpperCase().replace(/\s+/g, "") + '" WHERE false';
    const results = await pg.query(query);

    let fields = []; 
    results.fields.forEach(field => {
      fields.push(field.name);
    });

    return fields;
  }
}
