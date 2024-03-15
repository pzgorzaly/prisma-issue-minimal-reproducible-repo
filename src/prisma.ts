import {PrismaClient} from "@prisma/client";
import {type Prisma} from ".prisma/client";


const prisma = new PrismaClient()

export const updateObject = async () => {
    const id = 1;

    const test = await prisma.test.findFirst({
        where: {id}
    });

    return prisma.test.update({
        where: {id},
        data: test as Prisma.TestUpdateInput
    });
}


export const updateObjectWithoutJSON = async () => {
    const id = 1;

    const test = await prisma.testWithoutJSON.findFirst({
        where: {id}
    });

    return prisma.testWithoutJSON.update({
        where: {id},
        data: {...test, data: JSON.stringify(JSON.parse(test?.data ?? ''))} 
    });
}
