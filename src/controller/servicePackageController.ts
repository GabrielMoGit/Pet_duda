import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/serviceRespository";
import { ServicePackageRepository } from "../repositories/servicePackageRepository";
import { PetRepository } from "../repositories/petRepository";
import { ServiceController } from "./serviceController";

class ServicePackageController{

    async create(request: Request, response: Response){
        const {pet_id, package_type, service_date} = request.body

        const serviceRepository = new ServiceRepository()
        const servicePackageRepository = new ServicePackageRepository()
        const petRepository = new PetRepository()
        const serviceController = new ServiceController()


        try{

            const createdPackage = await servicePackageRepository.createAndSave(pet_id, package_type, false) 
            if(package_type === "quinzenal"){
                await serviceController.createBiweekly(createdPackage.id, new Date(service_date))
            }
            if(package_type == "semanal"){

            }

            return response.json('pacote criado')

        }catch(error){
            return response.json(error)
        }
        


    }

}

export { ServicePackageController }