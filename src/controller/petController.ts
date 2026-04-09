import { Request, Response} from "express"
import { TutorRepository } from "../repositories/tutorRepository";
import { PetRepository } from "../repositories/petRepository";

class petController{

    async create(request: Request, response: Response){
        const {name, phone} = request.body
        const tutorRepository = new TutorRepository()
        const petRepository = new PetRepository()

        const tutorAlreadyExist = await tutorRepository.findByPhone(phone)

        if(!tutorAlreadyExist){
            return response.status(400).json({
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
}

export { petController }