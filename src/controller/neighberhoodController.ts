import { Response, Request } from "express";
import { NeighborhoodRepository } from "../repositories/neighborhoodRepository";

class NeighborhoodController{

    async create(request: Request, response: Response){
        const { name } = request.body
        const neighborhoodRepository = new NeighborhoodRepository()

        try{
            const neighborhood = await neighborhoodRepository.checkIfNeighborhoodAlreadyExist(name)
            if(!neighborhood){
                await neighborhoodRepository.createAndSave(name)
            }
            return response.json(name)
        }catch(error){
            return response.status(500).json({
                message: "Erro ao cadastrar bairro"
            })
        }   
    }

    async listNeighborhoods(request: Request, response: Response){
        const neighborhoodRepository = new NeighborhoodRepository()

        try{
            const neighborhood = await neighborhoodRepository.listExistentneighborhoodsOnlyStringName()
            return response.json(neighborhood)
        }catch(error){
            return response.status(500).json({
                message: "Erro ao buscar ruas"
            })
        }
    }

    async filterNeighborhoodFromId(id: string[]){
        const neighborhoodRepository = new NeighborhoodRepository()

        type Neighborhood = {
            name: string
        }

        let neighborhoods: Neighborhood[] = []

        for(const item of id){
            const response = await neighborhoodRepository.returnNeighborhoodNameFromId(item)
            neighborhoods.push(response)
        }

        return neighborhoods
    }

    async localCreate(name: string){
        const neighborhoodRepository = new NeighborhoodRepository()

        const createdNeighbothood = await neighborhoodRepository.createAndSave(name)

        return createdNeighbothood
    }

    async checkIfNeighbothoodExistIfDontCreate(name: string){
        const neighborhoodRepository = new NeighborhoodRepository()

        const neighborhoodFound = await neighborhoodRepository.checkIfNeighborhoodAlreadyExist(name)

        if(!neighborhoodFound){
            const createdNeighbothood = this.localCreate(name)
            return createdNeighbothood
        }

        return neighborhoodFound
    }
}

export { NeighborhoodController }