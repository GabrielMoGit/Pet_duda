import { Request, Response} from "express"
import { TutorRepository } from "../repositories/tutorRepository";

class TutorController{
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

    async filterTutorForId(id: string[]){

        const tutorRepository = new TutorRepository()

        type Tutors = {
            tutorName: string;
            tutorPhone: string
        }

        let tutors: Tutors[] = []

        for(const item of id){
            const response = await tutorRepository.findById(item)

            tutors.push(response.tutor)
        }

        return tutors
    }
}

export {TutorController};