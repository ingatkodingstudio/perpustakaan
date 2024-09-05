import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicalBook } from 'src/physical-book/entities/physical-book.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private locationRepository: Repository<Location>,
    @InjectRepository(PhysicalBook) private physicalBookRepository: Repository<PhysicalBook>
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    const physicalBook = await this.getPhysicalBook(createLocationDto.physicalBookId);

    const location = new Location();
    location.rack = createLocationDto.rack;
    location.physicalBook = physicalBook;

    return this.locationRepository.save(location);
  }

  async findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    return this.locationRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOne({ where: { id } });

    if (!location) {
      throw new BadRequestException();
    }

    if (updateLocationDto.physicalBookId) {
      await this.getPhysicalBook(updateLocationDto.physicalBookId);
    }

    Object.assign(location, updateLocationDto);


    return this.locationRepository.save(location);
  }

  private async getPhysicalBook(physicalBookId: number): Promise<PhysicalBook> {
    const physicalBook = await this.physicalBookRepository.findOne({ where: { id: physicalBookId } });

    if (!physicalBook) {
      throw new BadRequestException();
    }

    return physicalBook
  }

  async remove(id: number) {
    return this.locationRepository.delete(id);
  }
}
