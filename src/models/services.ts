import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")

class services{

    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    service_package_id!: number

    @Column()
    service_date!: Date

    @Column()
    service_done!: boolean
}

export { services }