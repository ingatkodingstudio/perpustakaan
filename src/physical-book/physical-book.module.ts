import { Module } from '@nestjs/common';
import { PhysicalBookService } from './physical-book.service';
import { PhysicalBookController } from './physical-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalBook } from './entities/physical-book.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalBook]), BookModule],
  controllers: [PhysicalBookController],
  providers: [PhysicalBookService],
})
export class PhysicalBookModule { }
