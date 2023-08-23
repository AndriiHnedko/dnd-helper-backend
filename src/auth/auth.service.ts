import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const isValidPass = await this.comparePasswords(pass, user.password);
    if (!isValidPass) {
      return null;
    }

    return user;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register({ password, ...data }: RegisterDto) {
    const hashedPass = await this.hashPassword(password);
    const user = await this.usersService.create({
      ...data,
      password: hashedPass,
    });
    return this.login(user.email, password);
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(enteredPass: string, hashedPass: string) {
    return bcrypt.compare(enteredPass, hashedPass);
  }
}
