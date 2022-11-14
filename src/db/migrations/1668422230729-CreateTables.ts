import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1668422230729 implements MigrationInterface {
  name = 'CreateTables1668422230729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`theatre\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`seat\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`theatre_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ticket\` (\`id\` varchar(36) NOT NULL, \`show_time_id\` varchar(255) NOT NULL, \`seat_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`show_time\` (\`id\` varchar(36) NOT NULL, \`time\` timestamp NOT NULL, \`movie_id\` varchar(255) NOT NULL, \`theatre_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie\` (\`id\` varchar(36) NOT NULL, \`name_th\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`description_th\` varchar(255) NOT NULL, \`description_en\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`running_time\` int NOT NULL, \`release_date\` timestamp NOT NULL, \`end_at\` timestamp NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` ADD CONSTRAINT \`FK_1f986b47413066be1173648ae42\` FOREIGN KEY (\`theatre_id\`) REFERENCES \`theatre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_4dc83bc30f4fc3058919dfbdaf4\` FOREIGN KEY (\`show_time_id\`) REFERENCES \`show_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_bc6a9497287b609dbd2806850c7\` FOREIGN KEY (\`seat_id\`) REFERENCES \`seat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`show_time\` ADD CONSTRAINT \`FK_853eeac83568c47e6a2ab13eebf\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`show_time\` ADD CONSTRAINT \`FK_a8c24b63c08caa6291dce7fcfdb\` FOREIGN KEY (\`theatre_id\`) REFERENCES \`theatre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`show_time\` DROP FOREIGN KEY \`FK_a8c24b63c08caa6291dce7fcfdb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`show_time\` DROP FOREIGN KEY \`FK_853eeac83568c47e6a2ab13eebf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_bc6a9497287b609dbd2806850c7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_4dc83bc30f4fc3058919dfbdaf4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`seat\` DROP FOREIGN KEY \`FK_1f986b47413066be1173648ae42\``,
    );
    await queryRunner.query(`DROP TABLE \`movie\``);
    await queryRunner.query(`DROP TABLE \`show_time\``);
    await queryRunner.query(`DROP TABLE \`ticket\``);
    await queryRunner.query(`DROP TABLE \`seat\``);
    await queryRunner.query(`DROP TABLE \`theatre\``);
  }
}
