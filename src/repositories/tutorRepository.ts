import { dataSource } from "../database/dataSource";
import { tutors } from "../models/tutor";
import { Repository } from "typeorm";

class tutorRepository{

    private repository: Repository<tutors>

    constructor(){
        this.repository = dataSource.getRepository(tutors)
    }
}

export {tutorRepository}