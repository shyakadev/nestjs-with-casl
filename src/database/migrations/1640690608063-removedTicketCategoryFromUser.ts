import {MigrationInterface, QueryRunner} from "typeorm";

export class removedTicketCategoryFromUser1640690608063 implements MigrationInterface {
    name = 'removedTicketCategoryFromUser1640690608063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`name\` ON \`roles\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`ticketCategory\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_e23171c3864bdf0ebcc18b2b42a\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_e23171c3864bdf0ebcc18b2b42a\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_e23171c3864bdf0ebcc18b2b42a\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_e23171c3864bdf0ebcc18b2b42a\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`ticketCategory\` enum ('SOFTWARE_ENGINEER', 'NETWORK_ADMIN', 'SYSTEM_ADMIN', 'DATABASE_ADMIN', 'BUSINESS_ANALYST', 'ICT_SUPPORT') NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`name\` ON \`roles\` (\`name\`)`);
    }

}
