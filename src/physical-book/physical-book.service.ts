import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { UpdatePhysicalBookDto } from './dto/update-physical-book.dto';
import { PhysicalBook } from './entities/physical-book.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhysicalBookService {
  constructor(
    @InjectRepository(PhysicalBook) private physicalBookRepository: Repository<PhysicalBook>,
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) { }

  async create(createPhysicalBookDto: CreatePhysicalBookDto) {
    const book = await this.bookRepository.findOne({ where: { id: createPhysicalBookDto.bookId } });

    if (!book) {
      throw new BadRequestException();
    }

    const physicalBook = new PhysicalBook();
    physicalBook.book = book;
    physicalBook.condition = createPhysicalBookDto.condition;

    return this.physicalBookRepository.save(physicalBook);
  }

  async findAll() {
    return this.physicalBookRepository.find();
  }

  private async getPhysicalBook(id: number): Promise<PhysicalBook> {
    const physicalBook = await this.physicalBookRepository.findOneBy({id})

    if (!physicalBook) {
      throw new NotFoundException();
    }

    return physicalBook;
  }

  async findOne(id: number) {
    const physicalBook = await this.getPhysicalBook(id);

    return physicalBook;
  }

  async update(id: number, updatePhysicalBookDto: UpdatePhysicalBookDto) {
    const book = await this.getPhysicalBook(id);

    Object.assign(book, updatePhysicalBookDto);

    return this.physicalBookRepository.save(book);
  }

  async remove(id: number) {
    return this.physicalBookRepository.delete(id);
  }
}
