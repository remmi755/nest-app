import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './CreateUser.dto';
import mongoose from 'mongoose';
import axios from 'axios';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async addUsersToDb(@Body() createUserDto: CreateUserDto) {
    const response = await axios.get('https://reqres.in/api/users');
    const users = response.data.data;

    for (const user of users) {
      createUserDto = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      };
      await this.usersService.addUsersToDb(createUserDto);
    }

    return this.usersService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @Get()
  // getUsers() {
  //   return this.usersService.getUsers();
  // }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) {
      throw new HttpException('User not found', 404);
    }
    return findUser;
  }

  @Get(':id/avatar')
  async getUserAvatarById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const avatar = await this.usersService.getUserAvatarById(id);
    if (!avatar) {
      throw new HttpException('Avatar not found', 404);
    }
    return avatar;
  }

  @Patch()
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const deletedUser = await this.usersService.deleteUserById(id);
    if (!deletedUser) {
      throw new HttpException('User not found', 404);
    }

    return 'User deleted successfully';
  }

  @Delete()
  async deleteUsers() {
    const deletedUsers = await this.usersService.deleteAllUsers();
    if (!deletedUsers) {
      throw new HttpException('Users not found', 404);
    }
    return 'Users deleted successfully';
  }
}
