import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  addUsersToDb(createUserDto: CreateUserDto) {
    const users = new this.userModel(createUserDto);
    return users.save();
  }
  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async getUserAvatarById(id: string) {
    return this.userModel.findById(id).select('avatar');
  }

  async deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async deleteAllUsers() {
    return this.userModel.deleteMany();
  }
}
