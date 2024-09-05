import { PhysicalBook } from "src/physical-book/entities/physical-book.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rack: string;

    @ManyToMany(() => PhysicalBook, { onUpdate: 'CASCADE' })
    physicalBook: PhysicalBook

}
