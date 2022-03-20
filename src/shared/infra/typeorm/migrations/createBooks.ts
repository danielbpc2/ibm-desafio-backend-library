import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBooks1647700260488 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createTable(
      new Table({
        name: "books",
        columns: [
          {
            name: "sbn",
            type: "varchar",
            isPrimary: true,
            isNullable: false,
            isUnique: true,
            length: "13",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "author",
            type: "varchar",
            isNullable: false,
          },
          { name: "stock", type: "int", isNullable: false, default: 0 },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("books");
  }
}
