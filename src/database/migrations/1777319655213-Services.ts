import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Services1777319655213 implements MigrationInterface {
    name = 'Services1777319655213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services",
                columns:[
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "service_package_id",
                        type: "integer"
                    },
                    {
                        name: "service_date",
                        type: "timestamp"
                    },
                    {
                        name: "service_done",
                        type: "boolean"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services")
    }

}
