import { dataSource } from "../database/dataSource";
import { services } from "../models/services";
import { Repository, In } from "typeorm";

class ServiceRepository{

    private repository : Repository<services>

    constructor(){
        this.repository = dataSource.getRepository(services)
    }

    async createAndSave(service_package_id: number, service_date: Date, service_done: number){
        const service = this.repository.create({service_package_id, service_date, service_done})
        return this.repository.save(service)
    }

    async findById(service_package_id: number){
        return this.repository.findBy({service_package_id})
    }

    async listAllServices(){
        return await this.repository.find()
    }
}

export { ServiceRepository  }