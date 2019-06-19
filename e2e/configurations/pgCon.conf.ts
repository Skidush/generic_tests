const dbUser = 'postgres';
const dbPw = 'dev';
const dbServer = '127.0.0.1';
const dbPort = '5432';
const dbName = 'hmws';

const pg = require('pg');
const connectionString = 'postgres://' + dbUser + ':' + dbPw + '@' + dbServer + ':' + dbPort + '/' + dbName;

export class pgConnection {
    async query(query: string) {
        try {
            const client = new pg.Client(connectionString);
            client.connect();
            
            const result = await client.query(query);

            client.end();          

            return result;
        } catch (err) {
            throw err;
        }
    }
}