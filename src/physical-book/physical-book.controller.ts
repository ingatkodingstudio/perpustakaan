import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicalBookService } from './physical-book.service';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { UpdatePhysicalBookDto } from './dto/update-physical-book.dto';

@Controller('physical-book')
export class PhysicalBookController {
  constructor(private readonly physicalBookService: PhysicalBookService) {}

  @Post()
  create(@Body() createPhysicalBookDto: CreatePhysicalBookDto) {
    return this.physicalBookService.create(createPhysicalBookDto);
  }

  @Get()
  findAll() {
    return this.physicalBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalBookDto: UpdatePhysicalBookDto) {
    return this.physicalBookService.update(+id, updatePhysicalBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalBookService.remove(+id);
  }
}
