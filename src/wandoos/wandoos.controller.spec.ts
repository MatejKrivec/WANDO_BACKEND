import { Test, TestingModule } from '@nestjs/testing';
import { WandoosController } from './wandoos.controller';

describe('WandoosController', () => {
  let controller: WandoosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WandoosController],
    }).compile();

    controller = module.get<WandoosController>(WandoosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
