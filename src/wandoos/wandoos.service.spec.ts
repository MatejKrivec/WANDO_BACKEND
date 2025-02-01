import { Test, TestingModule } from '@nestjs/testing';
import { WandoosService } from './wandoos.service';

describe('WandoosService', () => {
  let service: WandoosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WandoosService],
    }).compile();

    service = module.get<WandoosService>(WandoosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
