import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalBookModule } from './physical-book/physical-book.module';
import { BarcodeModule } from './barcode/barcode.module';
import { LocationModule } from './location/location.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { typeOrmConfig } from './db/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      typeOrmConfig,
    ),
    BookModule,
    PhysicalBookModule,
    BarcodeModule,
    LocationModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
