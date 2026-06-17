import { dataSource } from "../database/dataSource";
import { pets } from "../models/pets";
import { Repository } from "typeorm";

class PetRepository{

    private repository: Repository<pets>

    constructor(){
        this.repository = dataSource.getRepository(pets)
    }

    async createAndSave(name: string, id_tutor: string){
        const pet = this.repository.create({name, id_tutor})
        return this.repository.save(pet)
    }

    async checkIfPetAlreadyExistForTutor(name: string, id_tutor: string){
        return this.repository.findOneBy({name, id_tutor})
    }

    async alterPetData(id: string, name:string){
        const petFound = await this.repository.findOneBy({id})

        if(!petFound){
            throw new Error("Pet não encontrado")
        }

        petFound.name = name

        await this.repository.save(petFound)
    }

    async returnTutorAndPetNameFromPetId(id: string){
        const pet = await this.repository.findOneBy({id})

        if (!pet) {
        throw new Error("Pet não encontrado no banco de dados")
        }
        return {
            pet:{
                petName: pet?.name,
                idTutor: pet?.id_tutor
            }
        }
    }

    async listAllExistentPets(){
        const pets = await this.repository.find()
        
        return pets
    }

    async listExistentPetsForTutor(id_tutor: string){
        const pets = await this.repository.findBy({id_tutor})

        if(!pets){
            throw new Error("Pets não encontrados")
        }
        return pets
    }

}

export {PetRepository}