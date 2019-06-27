import { pgConnection } from "../configurations/pgCon.conf";
import { ItemHelpers } from "./test-helpers";

const pg: pgConnection = new pgConnection();

export class ReportingDB {
  static async getItems(itemType: string, orderBy?: Array<String>, limit?: number) {
    (orderBy as any) = orderBy ? `ORDER BY "${orderBy[0].toUpperCase()}" ${orderBy[1]}` : '';
    itemType = ItemHelpers.toUpperCaseTrimmed(itemType);

    let query = `SELECT * FROM public."${itemType}" ${orderBy}`;
    query = limit ? `${query} LIMIT ${limit}` : query;

    const results = await pg.query(query);

    return results.rows;
  }

  static async getItem(itemType: string, columns?: Array<String>, filters?: Array<String>, orderBy?: Array<String>, limit?: number) {
    itemType = ItemHelpers.toUpperCaseTrimmed(itemType);

    let columnString = '*';
    let orderByString = '';

    if (columns) {
      columnString = ItemHelpers.toUpperCaseTrimmed(`${columns.join('", "')}`);
    }

    if (orderBy) {
      orderByString = `ORDER BY "${orderBy[0]}" ${orderBy[1]}`;
    }

    const filter = filters ? `WHERE ${filters.join(' AND ')}` : '';
    (limit as any) = limit ? `LIMIT ${limit}` : '';

    const query = `SELECT "${columnString}" FROM public."${itemType}" ${filter} ${orderByString} ${limit}`;
    const results = await pg.query(query);

    return results.rows;
  }

  static async getItemIDs(itemType: string, createdItemDetails: any) {
    itemType = ItemHelpers.toUpperCaseTrimmed(itemType);
    const itemColumns = await ReportingDB.getTableColumns(itemType);
    let IDs = "UUID";
    let querySelectors = [];

    Object.keys(createdItemDetails).forEach(key => {
      querySelectors.push(`"${ItemHelpers.toUpperCaseTrimmed(key)}" = '${createdItemDetails[key]}`);
    });

    if (itemColumns.indexOf('ID') >= 0) {
      IDs.concat(', "ID"');
    }

    const query = `SELECT ${IDs} FROM public."${itemType}" WHERE ${querySelectors.join(" AND ")}`;
    const results = await pg.query(query);
    return results.rows[0];
  }

  static async getTableColumns(itemType: string) {
    const query = 'SELECT * FROM public."' + ItemHelpers.toUpperCaseTrimmed(itemType) + '" WHERE false';
    const results = await pg.query(query);

    let fields = [];
    results.fields.forEach(field => {
      fields.push(field.name);
    });

    return fields;
  }
}
