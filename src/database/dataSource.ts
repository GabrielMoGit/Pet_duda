import "reflect-metadata"
import { DataSource } from "typeorm"

export const dataSource = new DataSource({
   type: "sqlite",
  database: "src/database/database.sqlite",
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false,
})
