import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { LoginDto } from './auth.dto';
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

    if (await this.encoder.checkPassword(pass, user.password_hash!)) {
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

  async register(credentials: LoginDto) {
    const password_hash = await this.encoder.encodePassword(
      credentials.password,
    );

    const { password: _, ...userData } = credentials;

    const user = await this.usersService.create({ ...userData, password_hash });

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
