import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBookService } from './physical-book.service';

describe('PhysicalBookService', () => {
  let service: PhysicalBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalBookService],
    }).compile();

    service = module.get<PhysicalBookService>(PhysicalBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
