import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decoreator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiCreatedResponse({
    description: 'Token response',
    type: LoginResponse,
  })
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Public()
  @Post('register')
  async register(@Body() register: RegisterDto) {
    const { password, ...payload } = register;
    return this.authService.register(payload, password);
  }
}
