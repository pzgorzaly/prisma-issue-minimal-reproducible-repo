import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Test = {
    id: Generated<number>;
    data: unknown;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type TestWithoutJSON = {
    id: Generated<number>;
    data: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type DB = {
    Test: Test;
    TestWithoutJSON: TestWithoutJSON;
};
