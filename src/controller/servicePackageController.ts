import { Request, Response } from "express";
import { ServicePackageRepository } from "../repositories/servicePackageRepository";
import { ServiceController } from "./serviceController";
import { PetController } from "./petController";
import { TutorController } from "./tutorController";
import { AddressController } from "./addressController";
import { PetRepository } from "../repositories/petRepository";

class ServicePackageController{

    async userResponse(request: Request, response: Response){
        const {pet_id, package_type, service_date, value} = request.body

        const servicePackageRepository = new ServicePackageRepository()
        const serviceController = new ServiceController()
        const petRepository = new PetRepository()

        const petAlreadyExist = await petRepository.returnTutorAndPetNameFromPetId(pet_id)

        if(!petAlreadyExist){
            return response.status(404).json({
                error: "Pet não encontrado"
            })
        }

        const today = new Date()
        const serviceDate = new Date(service_date)

        if(today > serviceDate){
            return response.status(400).json({
                error: "Impossível criar em data passada"
            })
        }

        const petAlreadyHavePackage = await servicePackageRepository.checkIfPetAlreadyHavePackage(pet_id)

        if(petAlreadyHavePackage){
            return response.status(409).json({
                error: "Pacote já criado para esse pet"
            })
        }

        try{
            const createdPackage = await servicePackageRepository.createAndSave(pet_id, package_type, 0, 0, value, 1) 
            const createdServices = await serviceController.create(createdPackage.id, new Date(service_date))
            return response.status(201).json({
                message: "Pacote criado"
            })

        }catch(error){
            console.log(error)
            return response.status(500).json({
                error: "Erro ao criar pacote"
            })
        }
    }

    async create(pet_id: string, package_type: string, service_date: string, value: string){
        const servicePackageRepository = new ServicePackageRepository()
        const serviceController = new ServiceController()
        const petRepository = new PetRepository()

        const petAlreadyExist = await petRepository.returnTutorAndPetNameFromPetId(pet_id)

            if(!petAlreadyExist){
                    console.log("Pet não encontrado")
                    return
            }

        try{    
            const createdPackage = await servicePackageRepository.createAndSave(pet_id, package_type, 0, 0, value, 1) 
            const createdServices = await serviceController.create(createdPackage.id, new Date(service_date))
                
            return ({createdPackage, createdServices})

        }catch(error){
            console.log(error)
            throw error
        }
    }

    async listPackages(request: Request, response: Response){
        const kind = request.query.kindOfPackage
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

        let packageRepositoryResponse = []

        if(kind === "unpaid"){
            packageRepositoryResponse = await servicePackageRepository.listAllUndoneActivePackages()
        }else{
            packageRepositoryResponse = await servicePackageRepository.listAllPackages()
        }
        
        let package_id = []
        let petsId = []
        for(const item of packageRepositoryResponse){
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

        for(let i = 0; i < packageRepositoryResponse.length; i++ ){
            const packageId = package_id[i]
            const package_type = packageRepositoryResponse[i].package_type
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
            const package_done = packageRepositoryResponse[i].package_done
            const package_paid = packageRepositoryResponse[i].paid
            const value = packageRepositoryResponse[i].value

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

    async turnPackagesToDoneStatusAndCreateNewPackage(){
        const servicePackageRepository = new ServicePackageRepository()
        const serviceController = new ServiceController()

        const undonePackages = await servicePackageRepository.listAllUndoneActivePackages()

        if (undonePackages.length === 0) {
            return;
        }

        for(const item of undonePackages){
            const response = await serviceController.listAllServicesForPackageId(item.id)
            
            const lastService = response[response.length - 1]
            const date = lastService?.service_date ?? null
            if(item.package_type === "Quinzenal"){
                date.setDate(date.getDate() + 14)
            }else{
                date.setDate(date.getDate() + 7)
            }
            const isDone = response.every(
                service => service.service_done
            )

            if(!date){
                continue
            }

            if(isDone){
                await servicePackageRepository.turnDoneCompletedPackage(item.id)
                await this.create(item.pet_id, item.package_type, date.toString(), item.value)
            }
        }
    }

    async turnPackagesToPaidStatus(request: Request, response: Response){
        const {package_id} = request.body

        const servicePackageRepository = new ServicePackageRepository()

        await servicePackageRepository.payPackage(package_id)
       
        return response.json({
            message: "Pacote pago"
        })
    }

    async returnExistentPackageForPetid(request: Request, response: Response){
        const pet_id = request.query.pet_id as string

        const servicePackageRepository = new ServicePackageRepository()
        const serviceController = new ServiceController()


        const packageFound = await servicePackageRepository.checkIfPetAlreadyHavePackage(pet_id)

        if(!packageFound){
            return response.status(404).json({
                message: 'Pacote não encontrado'
            })
        }

        const services = await serviceController.returnDateForPackageId(packageFound.id)
        return response.json({packageFound, services})
    }

    async updateServicePackage(request: Request, response: Response){
        const {id, package_type, value, active_package} = request.body
        const reviciedDates: Date[] = request.body.dates.map((date: string) => new Date(date))

        const servicePackageRepository = new ServicePackageRepository()
        const serviceController = new ServiceController()

        try{

            const packageFound = await servicePackageRepository.findOneById(id)

            if(!packageFound){
                return response.status(404).json({
                    message: "Pacote não encontrado" 
                })
            }

            const packageUpdated = await servicePackageRepository.updateServicePackage(id, package_type, value, active_package)

            if(!packageUpdated){
                return response.status(404).json({
                    message: "Pacote atualizado inexistente"
                })
            }

            if(active_package === 0){
                return response.status(200).json({
                    message: "Pacote cancelado com sucesso"
                })
            }

            const services = await serviceController.listAllServicesForPackageId(id)

            if(services.length != reviciedDates.length){

                for(const item of services){
                    await serviceController.removeDate(item.id)
                }

                await serviceController.create(id, reviciedDates[0])
            }

            const newServices = await serviceController.listAllServicesForPackageId(id)

            let newDates: Date [] = []

            for(let i = 0; i < newServices.length; i++){

                const date = await serviceController.alterServiceDate(newServices[i].id, reviciedDates[i])

                if(!date){
                    return
                }

                newDates.push(date.service_date)
            }

            await serviceController.turnDoneThePassedServices()

            return response.json({packageUpdated, newDates})

        }catch(error){
            console.log(error)
            throw error
        }
    }
}

export { ServicePackageController }

