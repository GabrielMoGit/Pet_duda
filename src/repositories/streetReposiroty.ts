import { dataSource } from "../database/dataSource";
import { streets } from "../models/streets";
import { Repository } from "typeorm";

class StreetRepository {

    private repository: Repository<streets>

    constructor(){
        this.repository = dataSource.getRepository(streets)
    }

    async createAndSave(name: string){
        const street = this.repository.create({name})
        return this.repository.save(street)
    }

    async checkIfStreetAlreadyExist(name: string){
        return await this.repository.findOneBy({name})
    }

    async listExistentStreetsOnlyStringName(){
        const streets =  await this.repository.find({
            select: ["name"]
        })  
        return streets.map(streets => streets.name)
    }

    async returnStreetNameFromId(id: string){
        const streets = await this.repository.findOneBy({id})

        if(!streets){
            throw new Error("Rua não encontrada")
        }

        return{
            name: streets.name
        }
    }
}

export { StreetRepository } 