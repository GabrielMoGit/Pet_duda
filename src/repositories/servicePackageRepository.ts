import { response } from "express";
import { dataSource } from "../database/dataSource";
import { servicePackage } from "../models/servicePackage";
import { Repository } from "typeorm";

class ServicePackageRepository {

    private repository : Repository<servicePackage>

    constructor(){
        this.repository = dataSource.getRepository(servicePackage)
    }

    async createAndSave(pet_id: string, package_type: string, service_description: string, reference_date: Date, package_done: number, paid: number, value: string, active_package: number){
        const servicePackage = this.repository.create({pet_id, package_type, service_description, reference_date, package_done, paid, value, active_package})
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

    async listAllUndoneActivePackages(){
        return await this.repository.find({
            where: {
                package_done: 0,
                active_package: 1
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
        return await this.repository.findOneBy({
            pet_id,
            active_package: 1
        })
    }

    async checkIfPetAlreadyHaveUnicService(pet_id: string){
        return await this.repository.findOneBy({
            pet_id,
            package_type: "Único",
            paid: 0
        })
    }

    async updateServicePackage(id: number, package_type: string, value: string, active_package: number, reference_date: Date, service_description: string){
        const servicePackage = await this.repository.findOneBy({id})

        if(!servicePackage){
            return {
                message: "Pacote não lozalido no banco de dados, não é possível alterar os dados"
            }
        }

        if(active_package === 0 && package_type !== "Único"){
            servicePackage.active_package = 0
            await this.repository.save(servicePackage)
            return {
                message: 'Pacote cancelado'
            }
        }

        servicePackage.package_type = package_type
        servicePackage.value = value
        servicePackage.reference_date = reference_date
        servicePackage.service_description = service_description

        await this.repository.save(servicePackage)

        return servicePackage
    }


    async alterReferenceDate(id: number, reference_date: Date){
        const packageFound = await this.repository.findOneBy({id})

        if(!packageFound){
            return {
                message: "Não foi possível alterar a data referência"
            }
        }

        packageFound.reference_date = reference_date
        await this.repository.save(packageFound)

        return packageFound
    }

    async cancelPackage(id: number){
        const packageFound = await this.repository.findOneBy({id})
        
        if(!packageFound){
            return {
                message: "Não foi possível cancelar o pacote"
            }
        }

        await this.repository.remove(packageFound)
    }
}

export { ServicePackageRepository } 