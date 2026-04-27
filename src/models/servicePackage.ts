import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"

@Entity("servicePackage")

class servicePackage{

    @PrimaryColumn()
    readonly id!: string

    @Column()
    pet_id!: string

    @Column()
    package_type!: string

    @Column()
    paid!: boolean

    constructor(){
        if(!this.id){
            this.id = v4()
        }
    }

}

export { servicePackage }