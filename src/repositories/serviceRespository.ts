import { dataSource } from "../database/dataSource";
import { services } from "../models/services";
import { Repository, LessThan } from "typeorm";

class ServiceRepository{

    private repository : Repository<services>

    constructor(){
        this.repository = dataSource.getRepository(services)
    }

    async createAndSave(service_package_id: number, service_date: Date, service_done: number){
        const service = this.repository.create({service_package_id, service_date, service_done})
        return this.repository.save(service)
    }

    async listByservicePackageId(service_package_id: number){
        return this.repository.findBy({service_package_id})
    }

    async listAllServices(){
        return await this.repository.find()
    }

    async turnDonethepPassedServices(){
        const today = new Date()
        today.setHours(0, 0, 0, 0);
        const services = await this.repository.find({
            where: {
                service_date: LessThan(today),
                service_done: 0
            }
        })

        for(const item of services){
            item.service_done = 1
        }

        await this.repository.save(services)
    }

    async alterServiceDate(id: number, service_date: Date){
        const service = await this.repository.findOneBy({id})

        if(!service){
            return 
        }

        if(service.service_date > service_date){
            service.service_done = 1
        }
        service.service_date = service_date

        await this.repository.save(service)
        return (service)
    }

    async returnDatesFromPackage(service_package_id: number){
        return await this.repository.find({
            where: { service_package_id}
        })
    }
    
}

export { ServiceRepository  }  