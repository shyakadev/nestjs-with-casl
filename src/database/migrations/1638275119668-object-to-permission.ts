import {MigrationInterface, QueryRunner} from "typeorm";

export class objectToPermission1638275119668 implements MigrationInterface {
    name = 'objectToPermission1638275119668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_564fb52684ec02a8d52e29944fb\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP COLUMN \`objectId\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD \`object\` enum ('user', 'role', 'permission') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_e23171c3864bdf0ebcc18b2b42a\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_e23171c3864bdf0ebcc18b2b42a\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP COLUMN \`object\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD \`objectId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_564fb52684ec02a8d52e29944fb\` FOREIGN KEY (\`objectId\`) REFERENCES \`objects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
