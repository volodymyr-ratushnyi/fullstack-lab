import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/schemas/schema.db",
  migrations: {
    path: "src/schemas/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
