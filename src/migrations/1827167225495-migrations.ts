import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1827167225495 implements MigrationInterface {
    name = 'Migrations1827167225495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE author (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL,
                imageUrl VARCHAR NULL
            )
        `);
        await queryRunner.query(`
            ALTER TABLE book 
            ADD COLUMN "authorId" integer`
        );
        


        const books = await queryRunner.query(`SELECT * FROM book`);
        for (const book of books) {
            const authorName = book.author;
            const authorId = await queryRunner.query(
                `INSERT INTO author (name) VALUES ($1) RETURNING id`,
                [authorName]
            );

            await queryRunner.query(
                `UPDATE book SET "authorId" = $1 WHERE id = $2`,
                [authorId, book.id]
            );
        }


        await queryRunner.query(`ALTER TABLE book DROP COLUMN author`);

        await queryRunner.query(`
        CREATE TABLE new_book (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            authorId INTEGER,
            FOREIGN KEY (authorId) REFERENCES author(id) ON DELETE CASCADE
        )
    `);


        await queryRunner.query(`
        INSERT INTO new_book (id, title, authorId)
        SELECT id, title, authorId FROM book
    `);


        await queryRunner.query(`DROP TABLE book`);


        await queryRunner.query(`ALTER TABLE new_book RENAME TO book`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
