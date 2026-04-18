import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"

@Entity("addresses")

class addresses{

    @PrimaryColumn()
    readonly id!: string

    @Column()
    tutor_id!: string

    @Column()
    neighborhood_id!: string

    @Column()
    street_id!: string

    @Column()
    number!: string

    constructor(){
        if(!this.id){
            this.id = v4()
        }
    }

}

export { addresses }