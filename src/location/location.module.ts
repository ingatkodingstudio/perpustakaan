import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { PhysicalBookModule } from 'src/physical-book/physical-book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), PhysicalBookModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule { }
