import { dataSource } from "../database/dataSource";
import { servicePackage } from "../models/servicePackage";
import { Repository } from "typeorm";

class ServiePackageRepository {

    private repository : Repository<servicePackage>

    constructor(){
        this.repository = dataSource.getRepository(servicePackage)
    }
}

export { ServiePackageRepository }