import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/serviceRespository";
import { ServiePackageRepository } from "../repositories/servicePackageRepository";

class ServiceController{

    private createBiweeklyDates(initialDate: Date): Date[]{
        const dates: Date[] = []

        dates.push(new Date(initialDate))

        const secondDate = new Date(initialDate)
        secondDate.setDate(initialDate.getDate() + 15)
        
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

    async createBiweekly(service_package_id: number, service_date: Date){

        const serviceRepository = new ServiceRepository()

        const dates = this.createBiweeklyDates(service_date)

        try{

            const results = []

            for(let i = 0; i < dates.length; i ++){
                const services = await serviceRepository.createAndSave(service_package_id, dates[i], false)
                results.push(services)
            }
            
            return results
        }

        catch(error){
            console.error(error)
            throw error
        }

        
    }

    async createWeekly(request: Request, response: Response){
        const {service_package_id, service_date} = request.body

        const serviceRepository = new ServiceRepository()

        const dates = this.createWeeklyDates(new Date(service_date))

        try{

            const results = []

            for(let i = 0; i < dates.length; i ++){
                const services = await serviceRepository.createAndSave(service_package_id, dates[i], false)
                results.push(services)
            }
            
            return response.json(results)

        }catch(error){
            return response.status(500).json({ error: "Erro ao criar serviços" })
        }
    }

}

export { ServiceController }