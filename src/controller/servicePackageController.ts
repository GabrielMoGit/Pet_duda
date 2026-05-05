import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/serviceRespository";
import { ServicePackageRepository } from "../repositories/servicePackageRepository";
import { ServiceController } from "./serviceController";
import { PetController } from "./petController";
import { TutorController } from "./tutorController";
import { AddressController } from "./addressController";

class ServicePackageController{

    async create(request: Request, response: Response){
        const {pet_id, package_type, service_date, value} = request.body
        const servicePackageRepository = new ServicePackageRepository()
        const serviceController = new ServiceController()
        console.log(value)
        try{

            const createdPackage = await servicePackageRepository.createAndSave(pet_id, package_type, 0, 0, value) 
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
        const addressesController = new AddressController()
        const serviceController = new ServiceController()

        type Service = {
            service_id: number,
            service_date: Date,
            service_done: number
        }

        let services: Service[] = []

        type CompletePackage ={
            package_id: number,
            package_type: string,
            tutor_name: string,
            tutor_phone: string,
            tutor_id: string,
            pet_name: string,
            pet_id: string,
            street: string,
            neighborhood: string,
            house_number: string,
            package_done: number,
            package_paid: number,
            services: Service[],
            value: string
        }

        let finalPackages : CompletePackage[] = []

        const allPackages = await servicePackageRepository.listAllPackages()
        
        let package_id = []
        let petsId = []
        for(const item of allPackages){
            petsId.push(item.pet_id)
            package_id.push(item.id)
        }

        const pets = await petController.filterPetForId(petsId)

        let tutorsId = []
        for(const item of pets){
            tutorsId.push(item.idTutor)
        }
        const tutors = await tutorController.filterTutorForId(tutorsId)

        const addresses = await addressesController.listAddresses(tutorsId)

        

        for(let i = 0; i < allPackages.length; i++ ){
            const packageId = package_id[i]
            const package_type = allPackages[i].package_type
            const tutor_name = tutors[i].tutorName
            const tutor_phone = tutors[i].tutorPhone
            const tutor_id = tutorsId[i]
            const pet_name = pets[i].petName
            const pet_id = petsId[i]
            const isolatedServices = await serviceController.listAllServicesForPackageId(package_id[i])
            let service_id: number
            let service_date: Date
            let service_done: number
            for(let j = 0; j < isolatedServices.length; j ++){
                service_id = isolatedServices[j].id
                service_date = isolatedServices[j].service_date
                service_done = isolatedServices[j].service_done
                services.push({
                    service_id,
                    service_date,
                    service_done
                })
            }
            const street = addresses[i].streetName
            const neighborhood = addresses[i].neighborhoodName
            const house_number = addresses[i].number
            const package_done = allPackages[i].package_done
            const package_paid = allPackages[i].paid
            const value = allPackages[i].value

            finalPackages.push({
                package_id: packageId,
                package_type: package_type,
                tutor_name: tutor_name,
                tutor_phone: tutor_phone,
                tutor_id: tutor_id,
                pet_name: pet_name,
                pet_id: pet_id,
                street: street,
                neighborhood: neighborhood,
                house_number: house_number,
                package_done: package_done,
                package_paid: package_paid,
                services: services,
                value: value
            })

            services = []
          
        }

        return response.json({finalPackages})
    }

}

export { ServicePackageController }