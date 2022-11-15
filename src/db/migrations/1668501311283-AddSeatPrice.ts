import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSeatPrice1668501311283 implements MigrationInterface {
  name = 'AddSeatPrice1668501311283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`seat\` ADD \`price\` int NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`seat\` DROP COLUMN \`price\``);
  }
}
