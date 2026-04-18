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

}

export { AddressRepository }