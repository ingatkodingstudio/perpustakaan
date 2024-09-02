import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barcode } from './entities/barcode.entity';
import { PhysicalBookModule } from 'src/physical-book/physical-book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Barcode]), PhysicalBookModule],
  controllers: [BarcodeController],
  providers: [BarcodeService],
})
export class BarcodeModule { }
