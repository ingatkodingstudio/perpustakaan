import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) { }


    async saveBook(book: Book): Promise<Book> {
        return this.bookRepository.save(book);
    }

    async getBooks(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async getBook(id: number): Promise<Book> {
        return this.getBookById(id);
    }

    async updateBook(id: number, book: Book): Promise<Book> {
        const oldBook = await this.getBookById(id);
        oldBook.author = book.author;
        oldBook.title = book.title;

        return this.bookRepository.save(oldBook);
    }

    private async getBookById(id: number): Promise<Book>  {
        const book = await this.bookRepository.findOneBy({ id });

        if (!book) {
            throw new NotFoundException(`No book with id ${id}`);
        }

        return book;
    }

    async removeBook(id: number) {
        return this.bookRepository.delete(id);
    }
}
