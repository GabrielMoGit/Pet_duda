import { dataSource } from "../database/dataSource";
import { tutors } from "../models/tutor";
import { Repository } from "typeorm";

class TutorRepository{

    private repository: Repository<tutors>

    constructor(){
        this.repository = dataSource.getRepository(tutors)
    }

    async findByPhone(phone: string){
        return this.repository.findOneBy({phone})
    }

    async createAndSave(name: string, phone: string){
        const tutor = this.repository.create({name, phone})
        return this.repository.save(tutor)
    }
}

export {TutorRepository}