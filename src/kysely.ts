import {DB} from "./kysely-db/types";
import {Pool} from "pg";
import {Kysely, PostgresDialect} from "kysely";

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        user: 'postgres',
        password: 'postgres',
        max: 10
    })
})

const db = new Kysely<DB>({
    dialect,
})

export const updateObject = async () => {
    const id = 1;

    const test = await db.selectFrom('Test')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();

    return db.updateTable('Test')
        .set(test!)
        .where('id', '=', id)
        .returningAll()
        .execute();
}

export const updateObjectWithoutJSON = async () => {
    const id = 1;

    const test = await db.selectFrom('TestWithoutJSON')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();

    return db.updateTable('TestWithoutJSON')
        .set({...test!, data: JSON.stringify(JSON.parse(test!.data))})
        .where('id', '=', id)
        .returningAll()
        .execute();
}
