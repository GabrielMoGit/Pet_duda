import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

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
}

export { servicePackage }