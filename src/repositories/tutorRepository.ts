import { dataSource } from "../database/dataSource";
import { tutors } from "../models/tutor";
import { Repository } from "typeorm";

class TutorRepository{

    private repository: Repository<tutors>

    constructor(){
        this.repository = dataSource.getRepository(tutors)
    }

    async findByPhone(phone: string){
        const tutor =  await this.repository.findOneBy({phone})

        if(!tutor){
            throw new Error('Tutor não existe')
        }

        return tutor
    }

    async alterTutorData(id: string, name: string, phone: string){
        const tutor = await this.repository.findOneBy({id})

        if(!tutor){
            throw new Error('Tutor não existe')
        }

        tutor.name = name
        tutor.phone = phone

        const alteredTutor = await this.repository.save(tutor)

        return alteredTutor
    }

    async findById(id: string){
        const tutor = await this.repository.findOneBy({id})

        if(!tutor){
            throw new Error('Tutor não encontrado')
        }
        return{
            tutor:{
                tutorName: tutor.name,
                tutorPhone: tutor.phone
            }
        }
    }

    async createAndSave(name: string, phone: string){
        const tutor = this.repository.create({name, phone})
        return await this.repository.save(tutor)
    }
}

export {TutorRepository}