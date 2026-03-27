import {app} from "../src/app";
import { connectDatabase } from "./database";
import dotenv from "dotenv"
import { resolve } from "path"

dotenv.config({
    path: resolve(__dirname, "../../.env")
})

connectDatabase()
app.listen(3000, ()=> console.log("Server is running!"))    