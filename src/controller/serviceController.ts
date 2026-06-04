import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/serviceRespository";
import { ServicePackageRepository } from "../repositories/servicePackageRepository";

class ServiceController{

    private createBiweeklyDates(initialDate: Date): Date[]{
        const dates: Date[] = []

        dates.push(new Date(initialDate))

        const secondDate = new Date(initialDate)
        secondDate.setDate(initialDate.getDate() + 14)
        
        dates.push(secondDate)

        return dates
    }

    private createWeeklyDates(initialDate: Date): Date[]{
        const dates: Date [] = []

        dates.push(new Date(initialDate))

        for(let i = 0; i < 3; i ++){
            const newDate = new Date(initialDate)
            newDate.setDate(initialDate.getDate() + ((i + 1) * 7))
            dates.push(newDate)
        }

        return dates
    }
    
    async listAllServicesForPackageId(package_id: number){

        const serviceRepository = new ServiceRepository()

        
        const response = await serviceRepository.listByservicePackageId(package_id)

        return response

    }

    async create(service_package_id: number, service_date: Date){

        const serviceRepository = new ServiceRepository()
        const servicePackageRepository = new ServicePackageRepository()
        
        let dates: Date [] = []

        try{

            const results = []

            const response = await servicePackageRepository.findOneById(service_package_id)

            if(response?.package_type === "Quinzenal"){
                dates = this.createBiweeklyDates(service_date)
            }

            if(response?.package_type === "Semanal"){
                dates = this.createWeeklyDates(service_date)
            }

            for(let i = 0; i < dates.length; i ++){
                const services = await serviceRepository.createAndSave(service_package_id, dates[i], 0)
                results.push(services)
            }
            
            return results
        }

        catch(error){
            console.error(error)
            throw error
        }
    }

    async checkIfAllPackagesServicesIsDone(service_package_id: number){

        const serviceRepository = new ServiceRepository()

        const services = await serviceRepository.listByservicePackageId(service_package_id)

        return services

    }

    async returnDateForPackageId(servicePackageId: number){
        const serviceRepository = new ServiceRepository()

        const date = await serviceRepository.returnDatesFromPackage(servicePackageId)

        return date
    }   

    async alterServiceDate(service_id: number, service_date: Date){
        const serviceRepository = new ServiceRepository()

        const service = await serviceRepository.alterServiceDate(service_id, service_date)

        return service

    }

    async removeDate(id: number){
        const serviceRepository = new ServiceRepository()

        try{
            const date = await serviceRepository.removeDate(id)

            return date
            
        }catch(error){
            return {
                message: ('Não foi possível remover' + error)
            }
        }
    }

    async turnDoneThePassedServices(){

        const serviceRepository = new ServiceRepository()

        await serviceRepository.turnDonethepPassedServices()
    }
}

export { ServiceController }