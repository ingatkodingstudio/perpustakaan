import { BadRequestException, Injectable, NotFoundException, Response } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from 'src/author/entities/author.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
        @InjectRepository(Author) private authorRepository: Repository<Author>
    ) { }


    async saveBook(bookDto: CreateBookDto): Promise<Book> {
        const author = await this.authorRepository.findOne({ where: { id: bookDto.authorId } });

        if (!author) {
            throw new BadRequestException();
        }

        const book = new Book();
        book.title = bookDto.title;
        book.author = author;

        return this.bookRepository.save(book);
    }

    async getBooks(): Promise<BookResponseDto[]> {
        const book = await this.bookRepository.find(
            { relations: ['author'] }
        );
        const bookDto = book.map((e) => {
            return { ...e, author: e.author.name };
        });

        return bookDto;
    }

    async getBook(id: number): Promise<Book> {
        return this.getBookById(id);
    }

    async updateBook(id: number, book: UpdateBookDto): Promise<Book> {
        const oldBook = await this.getBookById(id);


        if (!oldBook) {
            throw new BadRequestException();
        }

        Object.assign(oldBook, book);

        if (book.authorId) {
            const author = await this.authorRepository.findOne({ where: { id: book.authorId } });

            if (author) {
                oldBook.author = author;
            }
        }


        return this.bookRepository.save(oldBook);
    }

    private async getBookById(id: number): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id }, relations: ["author"] });

        if (!book) {
            throw new NotFoundException(`No book with id ${id}`);
        }

        return book;
    }

    async removeBook(id: number) {
        return this.bookRepository.delete(id);
    }
}
