import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDistrictTable1747752783002 implements MigrationInterface {
    name = 'CreateDistrictTable1747752783002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "districts" ("id" SERIAL NOT NULL, "divisionId" integer NOT NULL, "name" character varying NOT NULL, "bn_name" character varying NOT NULL, CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "districts"`);
    }

}
