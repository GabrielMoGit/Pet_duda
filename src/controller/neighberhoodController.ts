import { Response, Request } from "express";
import { NeighborhoodRepository } from "../repositories/neighborhoodRepository";

class NeighborhoodController{

    async create(response: Response, request: Request){
        const { name } = request.body

        const neighborhoodRepository = new NeighborhoodRepository()

        try{
            const neighborhood = await neighborhoodRepository.checkIfNeighborhoodAlreadyExist(name)
            if(!neighborhood){
                await neighborhoodRepository.createAndSave(name)
            }
            return response.json(neighborhood)
        }catch(error){
            return response.status(500).json({
                message: "Erro ao cadastrar bairro"
            })
        }
    }

    async listNeighborhoods(response: Response, request: Request){
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
}

export { NeighborhoodController }