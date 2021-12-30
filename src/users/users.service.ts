import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'ramil',
      password: '$2b$10$eOL26F4M0aRhpuexFQcEDOBDMt9BcIvrRBujWELgIDcF3X3.3039m',
    },
    {
      id: 2,
      username: 'maria',
      password: '$2b$10$eOL26F4M0aRhpuexFQcEDOBDMt9BcIvrRBujWELgIDcF3X3.3039m',
    },
  ];

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
