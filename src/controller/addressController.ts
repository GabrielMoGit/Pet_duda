import { Request, Response } from "express";
import { AddressRepository } from "../repositories/addressRepository";

class AddressController{

    async create(request: Request, response: Response){
        const {tutor_id, neighborhood_id, street_id, number} = request.body
        const addressRepository = new AddressRepository()

        try{
            const address = await addressRepository.createAndSave(tutor_id, neighborhood_id, street_id, number)
            return response.json(address)
        }catch(error){
            return response.status(500).json({
                message: "Erro ao cadastrar endereço"
            })
        }
    }

}

export { AddressController }