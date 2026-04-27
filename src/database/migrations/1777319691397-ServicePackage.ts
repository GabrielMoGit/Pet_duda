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
                        type: "uuid",
                        isPrimary: true
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
                        name: "paid",
                        type: "boolean"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
