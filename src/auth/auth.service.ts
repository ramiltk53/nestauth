import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findByUsername(
      loginUserInput.username,
    );

    if (user) {
      throw new ConflictException('User already exists!');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);

    return this.usersService.create({
      ...loginUserInput,
      password,
    });
  }
}
