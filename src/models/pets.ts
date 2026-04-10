import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"

@Entity("pets")

class pets{

    @PrimaryColumn()
    readonly id!: string
    
    @Column()
    readonly id_tutor!: string

    @Column()
    name!: string

    constructor(){
        if(!this.id){
            this.id = v4()
        }
    }
}

export {pets}