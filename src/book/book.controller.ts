import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    saveBook(@Body() book: Book) {
        this.bookService.saveBook(book)
    }

    @Get()
    getBooks()  {
        return this.bookService.getBooks();
    }

    @Get(':index')
    getBook(@Param('index') index: number)  {
        return this.bookService.getBook(index);
    }

    @Put(':index')
    updateBook(@Param('index') index: number, @Body() book: Book) {
        this.bookService.updateBook(index, book);
    }

    @Delete(':index')
    removeBook(@Param('index') index: number) {
        this.bookService.removeBook(index)
    }
}
