import { dataSource } from "../database/dataSource";
import { pets } from "../models/pets";
import { Repository } from "typeorm";

class PetRepository{

    private repository: Repository<pets>

    constructor(){
        this.repository = dataSource.getRepository(pets)
    }
}

export {PetRepository}