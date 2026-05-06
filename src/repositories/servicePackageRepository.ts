import { dataSource } from "../database/dataSource";
import { servicePackage } from "../models/servicePackage";
import { Repository } from "typeorm";

class ServicePackageRepository {

    private repository : Repository<servicePackage>

    constructor(){
        this.repository = dataSource.getRepository(servicePackage)
    }

    async createAndSave(pet_id: string, package_type: string,package_done: number, paid: number, value: string){
        const servicePackage = this.repository.create({pet_id, package_type, package_done, paid, value})
        return this.repository.save(servicePackage)
    }

    async findOneById(id: number){
        return this.repository.findOne({ where: {id}})
    }

    async listAllPackages(){
        return await this.repository.find()
    }

    async listAllPaidPackages(){
        return await this.repository.find({
            where: {
                paid: 1
            }
        })
    }
}

export { ServicePackageRepository }