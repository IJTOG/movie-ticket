import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovie1668411079371 implements MigrationInterface {
    name = 'CreateMovie1668411079371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` varchar(36) NOT NULL, \`name_th\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`description_th\` varchar(255) NOT NULL, \`description_en\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`running_time\` int NOT NULL, \`release_date\` timestamp NOT NULL, \`start_at\` timestamp NOT NULL, \`end_at\` timestamp NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`movie\``);
    }

}
