import { dataSource } from "../database/dataSource";
import { servicePackage } from "../models/servicePackage";
import { Repository } from "typeorm";

class ServicePackageRepository {

    private repository : Repository<servicePackage>

    constructor(){
        this.repository = dataSource.getRepository(servicePackage)
    }

    async createAndSave(pet_id: string, package_type: string,package_done: number, paid: number, value: string, active_package: number){
        const servicePackage = this.repository.create({pet_id, package_type, package_done, paid, active_package})
        return this.repository.save(servicePackage)
    }

    async findOneById(id: number){
        return this.repository.findOne({ where: {id}})
    }

    async listAllPackages(){
        return await this.repository.find() 
    }

    async listAllUnpaidPackages(){
        return await this.repository.find({
            where: {
                paid: 0
            }
        })
    }

    async listAllUndonePackages(){
        return await this.repository.find({
            where: {
                package_done: 0
            }
        })
    }

    async turnDoneCompletedPackage(id: number){
        const pkg = await this.repository.findOneBy({id})

        if(!pkg){
            return
        }

        pkg.package_done = 1
        
        await this.repository.save(pkg)
    }

    async payPackage(id: number){
        const pkg = await this.repository.findOneBy({id})

        if(!pkg){
            return
        }

        pkg.paid = 1
        
        await this.repository.save(pkg)
    }

    async checkIfPetAlreadyHavePackage(pet_id: string){
        return await this.repository.findOneBy({pet_id})
    }
}

export { ServicePackageRepository }