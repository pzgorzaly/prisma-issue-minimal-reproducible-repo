import express from "express";
import dotenv from "dotenv";
import * as v8 from "v8";

import * as prisma from "./prisma";
import * as kysely from "./kysely";

const args = process.argv.slice(2);

const repository  =  args[0] === 'kysely' ? kysely : prisma;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

function getObjectSizeInMB(obj: any) {
    const bytes = v8.serialize(obj).byteLength;
    return bytes / (1024 * 1024);
}

app.get("/", async (req, res) => {
    const result = await repository.updateObject();

    res.status(200).json({size: getObjectSizeInMB(result)});
});

app.get("/without-json", async (req, res) => {
    const result = await repository.updateObjectWithoutJSON();

    res.status(200).json({size: getObjectSizeInMB(result)});
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
