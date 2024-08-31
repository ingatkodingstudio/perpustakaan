import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/book.entity';
import { PhysicalBookModule } from './physical-book/physical-book.module';
import { PhysicalBook } from './physical-book/entities/physical-book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'sqlite',
        database: 'perpustakaan.db',
        entities: [Book, PhysicalBook],
        synchronize: true
      }
    ),
    BookModule,
    PhysicalBookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
