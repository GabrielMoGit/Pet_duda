import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Streets1775856193536 implements MigrationInterface {
    name = 'Streets1775856193536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "streets",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    }
        
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("streets")
    }

}
