import { Request, Response} from "express"
import { TutorRepository } from "../repositories/tutorRepository";
import { PetRepository } from "../repositories/petRepository";

class PetController{

    async create(request: Request, response: Response){
        const {name, phone} = request.body
        const tutorRepository = new TutorRepository()
        const petRepository = new PetRepository()

        const tutorAlreadyExist = await tutorRepository.findByPhone(phone)

        if(!tutorAlreadyExist){
            return response.status(404).json({
                error: "Tutor inexistente"
            })
        }

        const petAlreadyExist = await petRepository.checkIfPetAlreadyExistForTutor(name, tutorAlreadyExist.id)

        if(petAlreadyExist){
            return response.status(400).json({
                error: "Pet já cadastrado para esse tutor"
            })
        }

        petRepository.createAndSave(name, tutorAlreadyExist.id)

        return response.status(200).json({
            message: "Pet cadastrado!"
        })
    }

    async filterPetForId(id: string[]){

        const petRepository = new PetRepository()

        type Pets = {
            petName: string;
            idTutor: string
        }

        let pets: Pets[] = []

        for(const item of id){
            const response = await petRepository.returnTutorAndPetNameFromPetId(item)

            pets.push(response.pet)
        }

        return pets
    }

        async listAllPetsAndRespectiveTutors(request: Request, response: Response){

            const petRepository = new PetRepository()
            const tutorRepository = new TutorRepository()

            type PetAndTutorData = {
                pet_id: string,
                pet_name: string,
                tutor_name: string,
                tutor_phone: string
            }

            let petAndTutorData: PetAndTutorData[] = []

            const pets = await petRepository.listAllExistentPets()

            if(!pets){
                return
            }

            for(const item of pets){
                const tutor = await tutorRepository.findById(item.id_tutor)

                petAndTutorData.push({
                    pet_id: item.id,
                    pet_name: item.name,
                    tutor_name: tutor.tutor.tutorName,
                    tutor_phone: tutor.tutor.tutorPhone
                })
            }

            return response.json({petAndTutorData})

        }
}

export { PetController }