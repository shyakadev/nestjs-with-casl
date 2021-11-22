import {MigrationInterface, QueryRunner} from "typeorm";

export class user1636572348116 implements MigrationInterface {
    name = 'user1636572348116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleType\` \`roleType\` enum ('ADMIN', 'SENIOR', 'STAFF', 'BA') NOT NULL DEFAULT 'STAFF'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`ticketCategory\` \`ticketCategory\` enum ('SOFTWARE_ENGINEER', 'NETWORK_ADMIN', 'SYSTEM_ADMIN', 'DATABASE_ADMIN', 'BUSINESS_ANALYST', 'ICT_SUPPORT') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`ticketCategory\` \`ticketCategory\` enum ('0', '1', '2', '3', '4', '5') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleType\` \`roleType\` enum ('0', '1', '2', '3') NOT NULL DEFAULT ''2''`);
    }

}
