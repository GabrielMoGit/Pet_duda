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
        const address = this.repository.findOneBy({tutor_id, neighborhood_id, street_id, number})
        return address
    }

    async ListAllAddressesFromTutorId(tutor_id: string){
        const addresses =  await this.repository.findOneBy({tutor_id})

        if(!addresses){
            throw new Error('endereço não encontrado')
        }

        return addresses
    }

    async alterAddressData(id: string, neighborhood_id: string, street_id: string, number: string){
        const address = await this.repository.findOneBy({id})

        if(!address){
            throw new Error('endereço não encontrado')
        }

        address.neighborhood_id = neighborhood_id
        address.street_id = street_id
        address.number = number

        const alteredAddress = await this.repository.save(address)
        return alteredAddress
    }
}

export { AddressRepository }