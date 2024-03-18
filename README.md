# Minimal, Reproducible Example of High RSS Memory Usage Issue with Prisma

This repository contains a minimal, reproducible example demonstrating an issue with high RSS memory usage during queries involving PostgreSQL JSON columns when using Prisma ORM. The seeded data provided mimics real business data where the issue was encountered. In the application, records with large JSON columns are fetched, manipulated, and updated, causing significant RAM consumption under certain circumstances.

## Issue Description

When executing specific queries, the application's RSS memory usage spikes, sometimes reaching up to 1GB. This behavior has been observed consistently and can be reproduced using the code provided in this repository.

To demonstrate that the issue is related to Prisma, we have benchmarked the same operations using the Kysely ORM framework. Additionally, a workaround was implemented where a text field was used instead of a JSON column. A workaround has been implemented where a text field is used instead of a JSON column. While this reduces the problem, it is not a perfect solution.

## Reproducing the Issue

To reproduce the issue locally, follow these steps:

1. Set up the environment using Docker Compose:
```bash
  docker-compose up -d
```

2. Install dependencies:
```bash
  pnpm install
```

3. Run Prisma migrations:
```bash
  pnpm run migrate
```

4. Seed the database:
```bash
  pnpm run seed
```

5. Build the project:
```bash
  pnpm run build
```

6. Start the server with prisma:
```bash
  pnpm run run prisma
```
or with kysely
```bash
pnpm run run kysely
```

Now, you can access the application endpoints:

- **Fetching and updating data (JSON column):**
  curl [http://localhost:3001/](http://localhost:3001/)

- **Fetching and updating data (Text column replacing JSON):**
  curl [http://localhost:3001/without-json](http://localhost:3001/without-json)


## Analyzing Performance

Performance analysis can be conducted using [Clinic.js](https://clinicjs.org/doctor/), a performance profiling tool. Use the following npm scripts along with Clinic.js:

- **Prisma with JSON column:**
  pnpm run analysis:prisma:json

- **Prisma without JSON column:**
  pnpm run analysis:prisma:no-json

- **Kysely with JSON column:**
  pnpm run analysis:kysely:json

- **Kysely without JSON column:**
  npm run analysis:kysely:no-json
