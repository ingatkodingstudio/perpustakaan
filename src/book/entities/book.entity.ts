import { Author } from "src/author/entities/author.entity";
import { PhysicalBook } from "src/physical-book/entities/physical-book.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @ManyToOne(() => Author, author => author.books)
    author: Author

    @OneToMany(() => PhysicalBook, physicalBook => physicalBook.book)
    physical: PhysicalBook[]
}