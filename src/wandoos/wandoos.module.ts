import { Module } from '@nestjs/common';
import { WandoosService } from './wandoos.service';
import { WandoosController } from './wandoos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WandoosService],
  controllers: [WandoosController]
})
export class WandoosModule {}
