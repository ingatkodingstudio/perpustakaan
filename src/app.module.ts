import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalBookModule } from './physical-book/physical-book.module';
import { BarcodeModule } from './barcode/barcode.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'sqlite',
        database: 'perpustakaan.db',
        autoLoadEntities: true,
        synchronize: true
      }
    ),
    BookModule,
    PhysicalBookModule,
    BarcodeModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
