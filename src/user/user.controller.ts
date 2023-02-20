import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPartiallyDto,
} from './dto/user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const fetchedUser = this.userService.getUserById(id);
    const expectedKeys = Object.keys(fetchedUser);
    const actualKeys = Object.keys(updateUserDto);
    if (expectedKeys.length !== actualKeys.length) {
      throw new BadRequestException();
    }
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch(':id')
  async updateUserPartially(
    @Param('id') id: string,
    @Body() updateUserPartiallyDto: UpdateUserPartiallyDto,
  ) {
    return this.userService.updateUserPartially(id, updateUserPartiallyDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
