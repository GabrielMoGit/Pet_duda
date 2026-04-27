import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"

@Entity("services")

class services{

    @PrimaryColumn()
    readonly id!: string
    
    @Column()
    service_package_id!: string

    @CreateDateColumn()
    created_at!: Date

    @Column()
    service_done!: boolean

    constructor(){
        if(!this.id){
            this.id = v4()
        }
    }
}

export { services }