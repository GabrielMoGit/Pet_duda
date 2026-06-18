import { dataSource } from "./dataSource";

export const connectDatabase = async () => {
  try {
    console.log("cwd:", process.cwd());
    console.log("db:", require("path").resolve("src/database/database.sqlite"));
    await dataSource.initialize();
    console.log("Database connected successfuly!");
  } catch (err) {
    console.error("Error to connect database!", err);
    throw err;
  }
};
