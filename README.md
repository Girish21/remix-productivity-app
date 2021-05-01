# Welcome to Remix TailwindCSS and Prisma Starter

- [Remix Docs](https://docs.remix.run)
- [Customer Dashboard](https://remix.run/dashboard)

## Important

- [Prisma Postgres Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres)

_Don't forget to add DB URL into `.env`. For local Docker set up it's `postgresql://postgres:1234@localhost:5432/postgres?schema=remix_prisma`_

## Migaration

Add the required changes to `app/prisma/schema.prisma` and run `npm run migration`. This will sync postgres with the schema and generate a new migaration. This will also sync Prisma Client with the new data model and types.
