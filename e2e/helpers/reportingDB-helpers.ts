import { pgConnection } from "../configurations/pgCon.conf";

const pg: pgConnection = new pgConnection();

export class ReportingDB {
  static async getItems(itemName: string, orderBy?: string, limit?: number) {
    orderBy = orderBy ? `"${orderBy[0].toUpperCase()}" ${orderBy[1]}` : '"UUID" ASC';
    itemName = itemName.toUpperCase().replace(/\s+/g, "");

    let query = `SELECT * FROM public."${itemName}" ORDER BY ${orderBy}`;
    query = limit ? `${query} LIMIT ${limit}` : query;

    const results = await pg.query(query);

    return results.rows;
  }

  static async getSpecificItems(itemName: string, filter?: Array<string>, orderBy?: string, limit?: number) {
    // orderBy = orderBy ? `"${orderBy[0].toUpperCase()}" ${orderBy[1]}` : '"UUID" ASC';
    // itemName = itemName.toUpperCase().replace(/\s+/g, "");

    // let query = `SELECT * FROM public."${itemName}" ORDER BY ${orderBy}`;
    // query = limit ? `${query} LIMIT ${limit}` : query;

    const results = await pg.query(query);

    return results.rows;
  }

  static async getItemTableData(itemName: string, itemListColumns: Array<String>, state?: string, orderBy?: Array<String>, limit?: number) {
    itemName = itemName.toUpperCase().replace(/\s+/g, "");
    state = state ? `WHERE "STATE" = '${state}'` : '';
    (limit as any) = limit ? `LIMIT ${limit}` : '';
    let querySelectors = [];

    itemListColumns.forEach(column => {
      querySelectors.push('"' + column.toUpperCase().replace(/\s+/g, "") + '"');
    });

    const query = `SELECT ${querySelectors.join(", ")} FROM public."${itemName}" ` +
      `${state} ORDER BY "${orderBy[0]}" ${orderBy[1]} ${limit}`
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
