import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ServicePackage1777319691397 implements MigrationInterface {
    name = 'ServicePackage1777319691397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "service_package",
                columns:[
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "pet_id",
                        type: "uuid"
                    },
                    {
                        name: "package_type",
                        type: "varchar"
                    },
                    {
                        name: "service_description",
                        type: "varchar"
                    },
                    {
                        name: "reference_date",
                        type: "timeStamp"
                    },
                    {
                        name: "package_done",
                        type: "integer"
                    },
                    {
                        name: "paid",
                        type: "integer"
                    },
                    {
                        name: "value",
                        type: "varchar"
                    },
                    {
                        name: "active_package",
                        type: "integer"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("service_package")
    }

}
