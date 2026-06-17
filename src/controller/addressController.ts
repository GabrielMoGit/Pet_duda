import { Request, Response } from "express";
import { AddressRepository } from "../repositories/addressRepository";
import { StreetRepository } from "../repositories/streetReposiroty";
import { NeighborhoodRepository } from "../repositories/neighborhoodRepository";
import { TutorRepository } from "../repositories/tutorRepository";
import { StreetController } from "./streetController";
import { NeighborhoodController } from "./neighberhoodController";
import { neighborhoods } from "../models/neighborhoods";

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
        const streetController = new StreetController()
        const neighberhoodController = new NeighborhoodController()
        
        let addresses = []
        for(const item of tutorId){
            const response = await addressRepository.ListAllAddressesFromTutorId(item)
            addresses.push(response)
        }
        

        let streetsId = []
        let neighborhoodId = [] 
        let numbers = []
        for(const item of addresses){
            streetsId.push(item.street_id)
            neighborhoodId.push(item.neighborhood_id)
            numbers.push(item.number)
        }

        const streets = await streetController.filterStreetForId(streetsId)
        const neighborhoods = await neighberhoodController.filterNeighborhoodFromId(neighborhoodId)

        return addresses.map((addr, index) => ({
            addressId: addr.id,
            streetName: streets[index]?.name,
            neighborhoodName: neighborhoods[index]?.name,
            number: addr.number
        }))
    }

    async alterAddressData(id: string, neighborhood_id: string, street_id: string, number: string){
        const addressRepository = new AddressRepository()

        const alteredAddress = await addressRepository.alterAddressData(id, neighborhood_id, street_id, number)

        if(!alteredAddress){
            throw new Error("Não foi possível alterar as informações do endereço")
        }

        return alteredAddress
    }

}

export { AddressController }