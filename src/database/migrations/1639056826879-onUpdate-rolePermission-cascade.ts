import {MigrationInterface, QueryRunner} from "typeorm";

export class onUpdateRolePermissionCascade1639056826879 implements MigrationInterface {
    name = 'onUpdateRolePermissionCascade1639056826879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_e23171c3864bdf0ebcc18b2b42a\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_e23171c3864bdf0ebcc18b2b42a\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_e23171c3864bdf0ebcc18b2b42a\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_e23171c3864bdf0ebcc18b2b42a\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
