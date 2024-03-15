const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

function generateRandomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomObject(numKeys, keyLength) {
    const obj = {};
    const halfKeys = numKeys / 2;

    for (let i = 0; i < halfKeys; i++) {
        const key = generateRandomKey(keyLength);
        obj[key] = generateRandomKey(10);
    }

    for (let i = halfKeys; i < numKeys; i++) {
        const key = generateRandomKey(keyLength);
        obj[key] = Math.floor(Math.random() * 1000);
    }

    return obj;
}

async function main() {
    const data = {
        array1: Array(800).fill(undefined).map(() => generateRandomObject(120, 10)),
        array2: Array(300).fill(undefined).map(() => generateRandomObject(50, 10)),
        array3: Array(800).fill(undefined).map(() => generateRandomObject(40, 10))
    }

    await prisma.test.upsert({
        where: {id: 1},
        create: {data},
        update: {data},
    });

    await prisma.testWithoutJSON.upsert({
        where: {id: 1},
        create: {data: JSON.stringify(data)},
        update: {data: JSON.stringify(data)},
    });
}


main()
    .catch((error) => console.error('Error seeding data:', error))
    .then(() => console.log('Seed data created successfully!'))
    .finally(async () => await prisma.$disconnect());
