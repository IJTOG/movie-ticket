import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueTicket1668422900582 implements MigrationInterface {
    name = 'AddUniqueTicket1668422900582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_de6db493aeb146fd4fb25dcc63\` ON \`ticket\` (\`show_time_id\`, \`seat_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_de6db493aeb146fd4fb25dcc63\` ON \`ticket\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`deleted_at\` timestamp(6) NULL`);
    }

}
