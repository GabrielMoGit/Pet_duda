import { dataSource } from "../database/dataSource";
import { services } from "../models/services";
import { Repository } from "typeorm";

class ServiceRepository{

    private repository : Repository<services>

    constructor(){
        this.repository = dataSource.getRepository(services)
    }

    async createAndSave(service_package_id: number, service_date: Date, service_done: number){
        const service = this.repository.create({service_package_id, service_date, service_done})
        return this.repository.save(service)
    }
}

export { ServiceRepository  }