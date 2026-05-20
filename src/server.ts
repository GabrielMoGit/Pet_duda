import {app} from "../src/app";
import { connectDatabase } from "./database";
import dotenv from "dotenv"
import { resolve } from "path"
import cron from "node-cron"
import { ServiceRepository } from "./repositories/serviceRespository";4
import { ServicePackageController } from "./controller/servicePackageController";

const serviceRepository = new ServiceRepository()
const servicePackageController = new ServicePackageController()

dotenv.config({
    path: resolve(__dirname, "../../.env")
})

connectDatabase()
app.listen(3000, ()=> console.log("Server is running!"))    

cron.schedule('0 0 * * *', async () => {
    await serviceRepository.turnDonethepPassedServices()
    await servicePackageController.turnPackagesToDoneStatusAndCreateNewPackage()
    console.log("set services done");
}, {
    timezone: "America/Sao_Paulo"
});
