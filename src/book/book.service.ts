import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { Book } from './entities/book.entity';


@Injectable()
export class BookService {
    private savedBooks: Book[] = [];

    saveBook(book: Book) {
        this.savedBooks.push(book);
    }

    getBooks(): Book[] {
        let index = 0;
        const response = this.savedBooks.map(e => {
            const bookIndex = index
            index++

            const bookIndexed = {
                index: bookIndex,
                ...e
            }

            return bookIndexed;
        })
        return response;
    }

    getBook(index: number) {
        const choosenBook = this.getBookWithIndex(index);

        return {
            index: Number(index),
            ...choosenBook
        }

    }

    updateBook(index: number, book: Book) {
        this.getBookWithIndex(index);

        this.savedBooks[index] = book;
    }

    private getBookWithIndex(index: number): Book {
        const choosenBook = this.savedBooks[index]

        if (!choosenBook) {
            throw new NotFoundException(`Book with index ${index} not found`);
        }

        return choosenBook;
    }

    removeBook(index: number) {
        this.savedBooks.splice(index);
    }
}
