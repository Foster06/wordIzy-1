import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Avoid the env() wrapper! Use process.env and provide an inline fallback 
    // so Prisma never throws an initialization error.
    url: process.env.TURSO_DATABASE_URL ?? "file:./prisma/custom.db",
  },
});
