import { Request, Response} from "express"

class userController{

    async create(request: Request, response: Response){
        return response.json("created")
    }
}

export {userController};