import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthorModule],
  providers: [BookService],
  controllers: [BookController],
  exports: [TypeOrmModule.forFeature()]
})
export class BookModule { }
