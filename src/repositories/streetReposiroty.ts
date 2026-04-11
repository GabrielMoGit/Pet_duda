import { dataSource } from "../database/dataSource";
import { streets } from "../models/streets";
import { Repository } from "typeorm";

class streetRepository {

    private repository: Repository<streets>

    constructor(){
        this.repository = dataSource.getRepository(streets)
    }

    async createAndSave(name: string){
        const street = this.repository.create({name})
        return this.repository.save(street)
    }
}

export { streetRepository } 