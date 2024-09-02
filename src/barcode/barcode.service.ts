import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { Repository } from 'typeorm';
import { Barcode } from './entities/barcode.entity';
import { PhysicalBook } from 'src/physical-book/entities/physical-book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BarcodeService {
  constructor(
    @InjectRepository(Barcode) private barcodeRepository: Repository<Barcode>,
    @InjectRepository(PhysicalBook) private physicalBookRepository: Repository<PhysicalBook>
  ) { }

  async create(createBarcodeDto: CreateBarcodeDto) {
    const physicalBook = await this.getPhysicalBook(createBarcodeDto.physicalBookId);

    const barcode = new Barcode();
    barcode.barcode = createBarcodeDto.barcode;
    barcode.physicalBook = physicalBook;

    return this.barcodeRepository.save(barcode);
  }

  async findAll() {
    return this.barcodeRepository.find()
  }

  async findOne(id: number) {
    return this.barcodeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBarcodeDto: UpdateBarcodeDto) {
    const barcode = await this.barcodeRepository.findOne({ where: { id } })

    if (!barcode) {
      throw new BadRequestException();
    }

    if (updateBarcodeDto.physicalBookId) {
      await this.getPhysicalBook(updateBarcodeDto.physicalBookId);
    }

    Object.assign(barcode, updateBarcodeDto);

    return this.barcodeRepository.save(barcode);
  }

  async getPhysicalBook(id: number): Promise<PhysicalBook> {
    const physicalBook = this.physicalBookRepository.findOne({ where: { id } });

    if (!physicalBook) {
      throw new NotFoundException();
    }

    return physicalBook
  }

  async remove(id: number) {
    return this.barcodeRepository.delete(id)
  }
}
