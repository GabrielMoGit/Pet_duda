import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

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
}

export { services }