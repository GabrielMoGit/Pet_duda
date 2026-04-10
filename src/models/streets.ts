import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"

@Entity("streets")

class streets{

    @PrimaryColumn()
    readonly id!: string

    @Column()
    name!: string

    constructor(){
        if(!this.id){
            this.id = v4()
        }
    }

}

export { streets }