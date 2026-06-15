import { Request, Response} from "express"
import { TutorRepository } from "../repositories/tutorRepository";
import { AddressRepository } from "../repositories/addressRepository";

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

    async returnTutorDataFromPhone(request: Request, response: Response){
        const {phone} = request.body

        const tutorRepository = new TutorRepository()
        const addressRepository = new AddressRepository()

        const tutorFound = await tutorRepository.findByPhone(phone)

        if(!tutorFound){
            return response.status(404).json({
                message: "Tutor não encontrado"
            })
        }

        const addressFound = await addressRepository.ListAllAddressesFromTutorId(tutorFound.id)

        return response.json({addressFound, tutorFound})

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