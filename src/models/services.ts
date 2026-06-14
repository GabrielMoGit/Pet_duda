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
    value!: string

    @Column()
    service_description!: string

    @Column()
    service_done!: number
}

export { services }