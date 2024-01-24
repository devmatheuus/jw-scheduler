import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChristianTable1705945802568 implements MigrationInterface {
    name = 'CreateChristianTable1705945802568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "christians" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text(255) NOT NULL, "roles" text NOT NULL, "gender" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "christians"`);
    }

}
