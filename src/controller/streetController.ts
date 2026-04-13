import { Request, Response } from "express";
import { StreetRepository } from "../repositories/streetReposiroty";

class streetController{

    async create(request: Request, response: Response){
        const name = request.body

        const streetReposiroty = new StreetRepository()
    }
}

export { streetController }