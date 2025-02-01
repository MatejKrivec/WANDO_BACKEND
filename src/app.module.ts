import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WandoosModule } from './wandoos/wandoos.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, WandoosModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
