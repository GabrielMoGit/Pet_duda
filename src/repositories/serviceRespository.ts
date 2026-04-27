import { dataSource } from "../database/dataSource";
import { services } from "../models/services";
import { Repository } from "typeorm";

class ServiceRepository{

    private repository : Repository<services>

    constructor(){
        this.repository = dataSource.getRepository(services)
    }
}

export { ServiceRepository  }