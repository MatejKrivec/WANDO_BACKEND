import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy,AuthService],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
