import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decoreator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Public()
  @Post('register')
  async register(@Body() login: RegisterDto) {
    return this.authService.register(login);
  }
}
