import { Column, CreateDateColumn, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")

class services{

    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    service_package_id!: number

    @CreateDateColumn()
    created_at!: Date

    @Column()
    service_done!: boolean
}

export { services }