import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"

@Entity("Users")
class users{

    @PrimaryColumn()
    id!: string

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

export {users};
