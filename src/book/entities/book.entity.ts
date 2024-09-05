import { PhysicalBook } from "src/physical-book/entities/physical-book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    author: string

    @OneToMany(() => PhysicalBook, physicalBook => physicalBook.book)
    physical: PhysicalBook[]
}