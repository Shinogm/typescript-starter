import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserInterface>,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<UserInterface> {
    const createdUser = new this.userModel(CreateUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserInterface[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: number): Promise<UserInterface> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }
}
