import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Neighborhoods1775856622508 implements MigrationInterface {
    name = 'Neighborhoods1775856622508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "neighborhoods",
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
       await queryRunner.dropTable("neighbothoods")
    }

}
