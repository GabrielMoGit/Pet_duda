import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Pets1775774833763 implements MigrationInterface {
    name = 'Pets1775774833763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pets",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "id_tutor",
                        type: "uuid"
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
        await queryRunner.dropTable("pets")
        
    }

}
