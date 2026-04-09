import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"

@Entity("tutors")

class tutors{

    @PrimaryColumn()
    readonly id!: string

    @Column()
    name!: string

    @Column()
    phone!: string

    @CreateDateColumn()
    created_at!: Date;

    constructor(){
        if(!this.id){
            this.id = v4()
        }
    }
}

export {tutors};
