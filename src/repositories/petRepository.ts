import { stringify } from "node:querystring";
import { dataSource } from "../database/dataSource";
import { pets } from "../models/pets";
import { Repository } from "typeorm";

class PetRepository{

    private repository: Repository<pets>

    constructor(){
        this.repository = dataSource.getRepository(pets)
    }

    async createAndSave(name: string, id_tutor: string){
        const pet = this.repository.create({name, id_tutor})
        return this.repository.save(pet)
    }

}

export {PetRepository}