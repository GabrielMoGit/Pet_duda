import { dataSource } from "../database/dataSource";
import { neighborhoods } from "../models/neighborhoods";
import { Repository } from "typeorm";

class NeighborhoodRepository{

    private repository: Repository<neighborhoods>

    constructor(){
        this.repository = dataSource.getRepository(neighborhoods)
    }

    async createAndSave(name: string){
        const neighborhood = this.repository.create({name})
        return this.repository.save(neighborhood)
    }

    async checkIfNeighborhoodAlreadyExist(name: string){
        return await this.repository.findOneBy({name})
    }

    async listExistentneighborhoodsOnlyStringName(){
        const neighborhood = await this.repository.find({
            select: ['name']
        })
        return neighborhood.map(neighborhood => neighborhood.name)
    }
}

export { NeighborhoodRepository }