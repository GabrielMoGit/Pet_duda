import { dataSource } from "../database/dataSource";
import { addresses } from "../models/addresses";
import { Repository } from "typeorm";

class AddressRepository{

    private repository : Repository<addresses>

    constructor(){
        this.repository = dataSource.getRepository(addresses)
    }

    async createAndSave(tutor_id: string, neighborhood_id: string, street_id: string, number: string){
        const address = this.repository.create({tutor_id, neighborhood_id, street_id, number})
        return this.repository.save(address)
    }

    async checkIfAddressAlreadyExist(tutor_id: string, neighborhood_id: string, street_id: string, number: string){
        return this.repository.findOneBy({tutor_id, neighborhood_id, street_id, number})
    }

    async ListAllAddressesFromTutorId(tutor_id: string){
        const addresses =  await this.repository.findOneBy({tutor_id})

        if(!addresses){
            throw new Error('endereço não encontrado')
        }

        return{
            
                tutor_id: addresses.tutor_id,
                neighborhood_id: addresses.neighborhood_id,
                street_id: addresses.street_id,
                number: addresses.number
        }

    }
}

export { AddressRepository }