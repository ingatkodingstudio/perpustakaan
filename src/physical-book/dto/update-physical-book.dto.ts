import { PartialType } from '@nestjs/mapped-types';
import { CreatePhysicalBookDto } from './create-physical-book.dto';

export class UpdatePhysicalBookDto extends PartialType(CreatePhysicalBookDto) {}
