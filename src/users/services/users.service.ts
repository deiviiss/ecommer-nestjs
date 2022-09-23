import { User } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

@Injectable()
export class UsersService {
  private counterId = 2;

  private users: User[] = [
    {
      userId: 1,
      name: 'Armin Enrique',
      email: 'admin@mail.com',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.userId === id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;

    const newUser = {
      userId: this.counterId,
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    if (user) {
      const index = this.users.findIndex((item) => item.userId === id);
      this.users[index] = {
        ...user,
        ...payload,
      };

      return this.users[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.userId === id);

    if (index === -1) {
      throw new NotFoundException(`User ${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
