import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: { username: string, password: string, email: string }) {
    return await this.authService.signUp(body.username, body.password, body.email);
  }

  @Post('signin')
  async signIn(@Body() body: { username: string, password: string }) {
    return await this.authService.signIn(body.username, body.password);
  }

  @Post('confirm-signup')
    async confirmSignUp(@Body() body: { username: string, code: string }) {
    return await this.authService.confirmSignUp(body.username, body.code);
    }
}
