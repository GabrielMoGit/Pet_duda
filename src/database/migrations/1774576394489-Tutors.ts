import { MigrationInterface, QueryRunner } from "typeorm";

export class Tutors1774576394489 implements MigrationInterface {
    name = 'Tutors1774576394489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tutors" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Tutors"`);
    }

}
