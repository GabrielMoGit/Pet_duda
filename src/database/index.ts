import { dataSource } from "./dataSource";

export const connectDatabase = async () => {
    try{
        await dataSource.initialize()
        console.log("Database connected successfuly!")
    }
    catch(err){
        console.error("Error to connect database!", err)
        throw err;
    }
}

    


