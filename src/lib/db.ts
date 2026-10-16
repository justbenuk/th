import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const globalForPrisma = globalThis as unknown as {
  db: PrismaClient | undefined;
};

const db =
  globalForPrisma.db ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      max: 5,
      connectionTimeoutMillis: 15_000,
      idleTimeoutMillis: 10 * 60_000,
      keepAlive: true,
    }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;

export { db };
