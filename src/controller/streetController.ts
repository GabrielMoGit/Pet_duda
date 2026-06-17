import { Request, Response } from "express";
import { StreetRepository } from "../repositories/streetReposiroty";
import { OneToOneInverseSideSubjectBuilder } from "typeorm/browser/persistence/subject-builder/OneToOneInverseSideSubjectBuilder.js";

class StreetController{

    async create(request: Request, response: Response){
        const { name } = request.body

        const streetReposiroty = new StreetRepository()

        try{
            const street = await streetReposiroty.checkIfStreetAlreadyExist(name)
            if(!street){
                await streetReposiroty.createAndSave(name)
            }
            return response.json(street)
        }catch(error){
            return response.status(500).json({
                message: "Erro ao cadastrar rua"
            })
        }
    }

    async listStreets(request: Request, response: Response){
        const streetReposiroty = new StreetRepository()

        try{
            const streets = await streetReposiroty.listExistentStreetsOnlyStringName()
            return response.json(streets)

        }catch(error){
            return response.status(500).json({
                message: "Erro ao buscar rua"
            })
        }
    }

    async filterStreetForId(id: string[]){
        const streetReposiroty = new StreetRepository()

        type Street = {
            name: string
        }

        let streets: Street[] = []

        for(const item of id){
            const response = await streetReposiroty.returnStreetNameFromId(item)
            streets.push(response)
        }

        return streets
    }

    async locelCreate(name: string){
        const streetReposiroty = new StreetRepository()

        const createdStreet = await streetReposiroty.createAndSave(name)

        return createdStreet
    }

    async checkIfStreetExistIfDontCreate(name: string){
        const streetReposiroty = new StreetRepository()
        
        const streetFound = await streetReposiroty.checkIfStreetAlreadyExist(name)

        if(!streetFound){
            const createdStreet = this.locelCreate(name)
            return createdStreet
        }

        return streetFound
    
    }
}   

export { StreetController }