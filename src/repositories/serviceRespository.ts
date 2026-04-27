import { dataSource } from "../database/dataSource";
import { services } from "../models/services";
import { Repository } from "typeorm";

class ServiceRepository{

    private repository : Repository<services>

    constructor(){
        this.repository = dataSource.getRepository(services)
    }

    async createAndSave(service_package_id: string, service_done: boolean){
        const service = this.repository.create({service_package_id, service_done})
        return this.repository.save(service)
    }
}

export { ServiceRepository  }