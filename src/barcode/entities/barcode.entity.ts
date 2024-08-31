import { PhysicalBook } from "src/physical-book/entities/physical-book.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barcode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    barcode: string

    @OneToOne(() => PhysicalBook, physicalBook => physicalBook.barcode)
    @JoinColumn()
    physicalBook: PhysicalBook
}
