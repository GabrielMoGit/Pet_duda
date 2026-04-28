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
    paid!: boolean
}

export { servicePackage }