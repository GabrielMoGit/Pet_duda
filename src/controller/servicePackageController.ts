import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/serviceRespository";
import { ServicePackageRepository } from "../repositories/servicePackageRepository";
import { ServiceController } from "./serviceController";
import { PetController } from "./petController";
import { TutorController } from "./tutorController";

class ServicePackageController{

    async create(request: Request, response: Response){
        const {pet_id, package_type, service_date} = request.body
        const servicePackageRepository = new ServicePackageRepository()
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

        const servicePackageRepository = new ServicePackageRepository()
        const tutorController = new TutorController()
        const petController = new PetController()

        const allPackages = await servicePackageRepository.listAllPackages()
        
        let petsId = []

        for(const item of allPackages){
            petsId.push(item.pet_id)
        }

        const pets = await petController.filterPetForId(petsId)

        let tutorsId = []

        for(const item of pets){
            tutorsId.push(item.idTutor)
        }

        const tutors = await tutorController.filterTutorForId(tutorsId)

        return response.json({allPackages, pets, tutors})
    }

}

export { ServicePackageController }