import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Addresses1775857082899 implements MigrationInterface {
    name = 'Addresses1775857082899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "addresses",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "tutor_id",
                        type: "uuid"
                    },
                    {
                        name: "neighborhood_id",
                        type: "uuid"
                    },
                    {
                        name: "street_id",
                        type: "uuid"
                    },
                    {
                        name: "number",
                        type: "varchar"
                    }
        
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("addresses")
    }

}
