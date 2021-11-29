import {MigrationInterface, QueryRunner} from "typeorm";

export class permissionEnum1637854234113 implements MigrationInterface {
    name = 'permissionEnum1637854234113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_564fb52684ec02a8d52e29944fb\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP COLUMN \`action\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD \`action\` enum ('manage', 'create', 'read', 'update', 'delete') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permisions\` CHANGE \`objectId\` \`objectId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_b4599f8b8f548d35850afa2d12c\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_06792d0c62ce6b0203c03643cdd\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` CHANGE \`permissionId\` \`permissionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_564fb52684ec02a8d52e29944fb\` FOREIGN KEY (\`objectId\`) REFERENCES \`objects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_b4599f8b8f548d35850afa2d12c\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_06792d0c62ce6b0203c03643cdd\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permisions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_06792d0c62ce6b0203c03643cdd\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_b4599f8b8f548d35850afa2d12c\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP FOREIGN KEY \`FK_564fb52684ec02a8d52e29944fb\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` CHANGE \`permissionId\` \`permissionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_06792d0c62ce6b0203c03643cdd\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permisions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_b4599f8b8f548d35850afa2d12c\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permisions\` CHANGE \`objectId\` \`objectId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permisions\` DROP COLUMN \`action\``);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD \`action\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permisions\` ADD CONSTRAINT \`FK_564fb52684ec02a8d52e29944fb\` FOREIGN KEY (\`objectId\`) REFERENCES \`objects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
