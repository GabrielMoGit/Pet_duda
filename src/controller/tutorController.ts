import { Request, Response} from "express"
import { TutorRepository } from "../repositories/tutorRepository";

class tutorController{
    async create(request: Request, response: Response){
        const {name, phone} = request.body
        const tutorRepository = new TutorRepository()
     
        const tutorAlreadyExist = await tutorRepository.findByPhone(phone)

        if(tutorAlreadyExist){
            return response.status(400).json({
                error: "Telefone já cadastrado"
            })
        }

        tutorRepository.createAndSave(name, phone)

        return response.status(200).json({
            message: "Tutor cadastrado!"
        })
        
    }
}

export {tutorController};