import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterWithouPasswordDto } from './dto/register.dto';
import { EncoderService } from './encoder.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encoder: EncoderService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    if (await this.encoder.check(pass, user.password_hash as string)) {
      return user;
    }

    return null;
  }

  async login(credentials: LoginDto) {
    const user = await this.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: RegisterWithouPasswordDto, password: string) {
    const password_hash = await this.encoder.encode(password);

    const user = await this.usersService
      .create({ ...userData, password_hash })
      .catch((e) => {
        if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
          throw new BadRequestException('Email already exists');
        }
        throw e;
      });

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
