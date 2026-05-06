import {app} from "../src/app";
import { connectDatabase } from "./database";
import dotenv from "dotenv"
import { resolve } from "path"
import cron from "node-cron"
import { ServiceRepository } from "./repositories/serviceRespository";

const serviceRepository = new ServiceRepository()

dotenv.config({
    path: resolve(__dirname, "../../.env")
})

connectDatabase()
app.listen(3000, ()=> console.log("Server is running!"))    

cron.schedule('0 0  * * *', () => {
    serviceRepository.turnDonethepPassedServices()
    console.log("set services done");
}, {
    timezone: "America/Sao_Paulo"
});
