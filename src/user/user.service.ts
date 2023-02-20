import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPartiallyDto,
} from './dto/user-dto';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    new User('1', 'Alice', 'alice@example.com'),
    new User('2', 'Bob', 'bob@example.com'),
    new User('3', 'Charlie', 'charlie@example.com'),
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = new User(
      createUserDto.id,
      createUserDto.name,
      createUserDto.email,
    );
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const oldUser = this.getUserById(id);
    const updatedUser = { ...oldUser, ...updateUserDto };
    return updatedUser;
  }

  updateUserPartially(
    id: string,
    updateUserPartiallyDto: UpdateUserPartiallyDto,
  ): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const existingUser = this.users[index];
    const updatedUser = { ...existingUser, ...updateUserPartiallyDto };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: string): User[] {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
    return this.users;
  }
}
