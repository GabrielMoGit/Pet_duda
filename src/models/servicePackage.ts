import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";

@Entity("service_package")

class servicePackage{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    pet_id!: string

    @Column()
    package_type!: string

    @Column()
    service_description!: string

    @Column()
    reference_date!: Date

    @Column()
    package_done!: number

    @Column()
    paid!: number

    @Column()
    value!: string

    @Column()
    active_package!: number
}

export { servicePackage }