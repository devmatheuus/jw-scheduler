import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChristiansTable1705967172494 implements MigrationInterface {
    name = 'UpdateChristiansTable1705967172494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_christians" ("id" text PRIMARY KEY NOT NULL, "name" text(255) NOT NULL, "roles" text NOT NULL, "gender" text NOT NULL, "date_of_last_part" text, "current_responsibility" text)`);
        await queryRunner.query(`INSERT INTO "temporary_christians"("id", "name", "roles", "gender", "date_of_last_part", "current_responsibility") SELECT "id", "name", "roles", "gender", "date_of_last_part", "current_responsibility" FROM "christians"`);
        await queryRunner.query(`DROP TABLE "christians"`);
        await queryRunner.query(`ALTER TABLE "temporary_christians" RENAME TO "christians"`);
        await queryRunner.query(`CREATE TABLE "temporary_christians" ("id" text PRIMARY KEY NOT NULL, "name" text(255) NOT NULL, "roles" text NOT NULL, "gender" text NOT NULL, "date_of_last_part" text, "current_responsibility" text NOT NULL DEFAULT ('[]'))`);
        await queryRunner.query(`INSERT INTO "temporary_christians"("id", "name", "roles", "gender", "date_of_last_part", "current_responsibility") SELECT "id", "name", "roles", "gender", "date_of_last_part", "current_responsibility" FROM "christians"`);
        await queryRunner.query(`DROP TABLE "christians"`);
        await queryRunner.query(`ALTER TABLE "temporary_christians" RENAME TO "christians"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "christians" RENAME TO "temporary_christians"`);
        await queryRunner.query(`CREATE TABLE "christians" ("id" text PRIMARY KEY NOT NULL, "name" text(255) NOT NULL, "roles" text NOT NULL, "gender" text NOT NULL, "date_of_last_part" text, "current_responsibility" text)`);
        await queryRunner.query(`INSERT INTO "christians"("id", "name", "roles", "gender", "date_of_last_part", "current_responsibility") SELECT "id", "name", "roles", "gender", "date_of_last_part", "current_responsibility" FROM "temporary_christians"`);
        await queryRunner.query(`DROP TABLE "temporary_christians"`);
        await queryRunner.query(`ALTER TABLE "christians" RENAME TO "temporary_christians"`);
        await queryRunner.query(`CREATE TABLE "christians" ("id" text PRIMARY KEY NOT NULL, "name" text(255) NOT NULL, "roles" text NOT NULL, "gender" text NOT NULL, "date_of_last_part" text, "current_responsibility" text)`);
        await queryRunner.query(`INSERT INTO "christians"("id", "name", "roles", "gender", "date_of_last_part", "current_responsibility") SELECT "id", "name", "roles", "gender", "date_of_last_part", "current_responsibility" FROM "temporary_christians"`);
        await queryRunner.query(`DROP TABLE "temporary_christians"`);
    }

}
