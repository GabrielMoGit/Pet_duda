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

            const createdPackage = await servicePackageRepository.createAndSave(pet_id, package_type, 0, 0) 
                await serviceController.create(createdPackage.id, new Date(service_date))


            return response.json(createdPackage)

        }catch(error){
            return response.json(error)
        }
    }

    async listPackages(request: Request, response: Response){

        const petRepository = new PetRepository()
        const servicePackageRepository = new ServicePackageRepository()

        const allPackages = await servicePackageRepository.listAllPackages()
        
        type Pets = {
            petName: string;
            idTutor: string
        }

        let pets: Pets[] = []

        for(const item of allPackages){
            const response = await petRepository.returnTutorAndPetNameFromPetId(item.pet_id)

            pets.push(response.pet)
        }




        
        return response.json({allPackages, pets})
    }

}

export { ServicePackageController }