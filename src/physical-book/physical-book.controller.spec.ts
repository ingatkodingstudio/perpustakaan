import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalBookController } from './physical-book.controller';
import { PhysicalBookService } from './physical-book.service';

describe('PhysicalBookController', () => {
  let controller: PhysicalBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalBookController],
      providers: [PhysicalBookService],
    }).compile();

    controller = module.get<PhysicalBookController>(PhysicalBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
