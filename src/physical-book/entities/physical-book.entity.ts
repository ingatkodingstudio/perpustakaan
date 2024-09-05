import { Barcode } from "src/barcode/entities/barcode.entity";
import { Book } from "src/book/entities/book.entity";
import { Column, Entity, Generated, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhysicalBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column({unique: true})
    copyNumber: string;

    @Column({type:'bigint', default: Date.now()})
    registeredDate: number

    @Column()
    condition: string;

    @ManyToOne(() => Book, book => book.physical)
    book: Book

    @OneToOne(() => Barcode, barcode => barcode.physicalBook)
    barcode: Barcode
}
