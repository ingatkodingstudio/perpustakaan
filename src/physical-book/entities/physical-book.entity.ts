import { Barcode } from "src/barcode/entities/barcode.entity";
import { Book } from "src/book/entities/book.entity";
import { Location } from "src/location/entities/location.entity";
import { Column, Entity, Generated, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhysicalBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    @Column({ unique: true })
    copyNumber: string;

    @Column({ type: 'bigint', default: Date.now() })
    registeredDate: number

    @Column()
    condition: string;

    @ManyToOne(() => Book, book => book.physical)
    book: Book

    @OneToOne(() => Barcode, barcode => barcode.physicalBook)
    barcode: Barcode

    @ManyToMany(() => Location, { onUpdate: 'CASCADE' })
    location: Location
}
