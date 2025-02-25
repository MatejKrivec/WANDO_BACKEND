import { Controller, Get, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // Protects this endpoint
  getSuccess() {
    return this.testService.getSuccessMessage();
  }

  @Get('hello')
  getHello(): string {
    return 'Hello from the new endpoint!';
  }
}
