import { Request, Response } from "express";
import { AddressRepository } from "../repositories/addressRepository";
import { StreetRepository } from "../repositories/streetReposiroty";
import { NeighborhoodRepository } from "../repositories/neighborhoodRepository";
import { TutorRepository } from "../repositories/tutorRepository";

class AddressController{

    async create(request: Request, response: Response){
        const {tutorPhone, streetName, neighborhoodName, number} = request.body
        const addressRepository = new AddressRepository()
        const streetReposiroty = new StreetRepository()
        const neighborhoodRepository = new NeighborhoodRepository()
        const tutorRepository = new TutorRepository()


        try{

            const street = await streetReposiroty.checkIfStreetAlreadyExist(streetName)
            const neighborhood = await neighborhoodRepository.checkIfNeighborhoodAlreadyExist(neighborhoodName)
            const tutor = await tutorRepository.findByPhone(tutorPhone)
            const addressAlreadyExist = await addressRepository.checkIfAddressAlreadyExist(tutor!.id, neighborhood!.id, street!.id, number)

            if(!addressAlreadyExist){
                const address = await addressRepository.createAndSave(tutor!.id, neighborhood!.id, street!.id, number)
                return response.json(address)
            }

            
        }catch(error){
            return response.status(500).json({
                message: "Erro ao cadastrar endereço"
            })
        }
    }

    async listAddresses(tutorId: string[]){

        const addressRepository = new AddressRepository()
        const streetReposiroty = new StreetRepository()

        const allAddresses = await addressRepository.ListAllAddresses()

        let streetsId = []
        for(const item of allAddresses){
            streetsId.push(item.street_id)
        }


    }

}

export { AddressController }