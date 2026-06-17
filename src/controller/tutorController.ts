import { Request, Response} from "express"
import { TutorRepository } from "../repositories/tutorRepository";
import { AddressRepository } from "../repositories/addressRepository";
import { AddressController } from "./addressController";
import { StreetController } from "./streetController";

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
        const phone = request.query.phone as string

        const tutorRepository = new TutorRepository()
        const addressController = new AddressController()

        const tutorFound = await tutorRepository.findByPhone(phone)


        if(!tutorFound){
            return response.status(404).json({
                message: "Tutor não encontrado"
            })
        }

        const tutorId: string [] = []

        tutorId.push(tutorFound.id)

        const addressFound = await addressController.listAddresses(tutorId)

        return response.status(200).json({addressFound, tutorFound})

    }

    async alterTutorData(request: Request, response: Response){
        const {name, newPhone, oldPhone, street, neighborhood, number} = request.body

        const tutorRepository = new TutorRepository()
        const addressController = new AddressController()
        const streetController = new StreetController()

        const tutorFound = await tutorRepository.findByPhone(oldPhone)

        if(!tutorFound){
            return response.status(404).json({
                message: "Tutor não existe"
            })
        }

        const tutorId: string [] = []
        tutorId.push(tutorFound.id)

        const address = await addressController.listAddresses(tutorId)

        let streetFound: any

        for(const item of address){
            streetFound = await streetController.checkIfStreetExistIfDontCreate(item.streetName)
        }

        console.log(streetFound)
        

        

        //const alteredTutor = await tutorRepository.alterTutorData(tutorFound.id, name, newPhone)

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