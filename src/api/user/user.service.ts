import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSchemaDB } from 'src/database/schema/user.schema'; // Adjust the import path
import { CustomPinoLogger } from 'src/pino/pino.logger';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaDB.name) private userModel: Model<UserInterface>,
    private readonly logger: CustomPinoLogger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const createdUser = new this.userModel(createUserDto);

    try {
      return await createdUser.save();
    } catch (error) {
      console.log('Error creating user:', error);
      throw error;
    }
  }

  async findAll(): Promise<UserInterface[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      console.error('Error finding all users:', error);
      throw new Error('Failed to find users');
    }
  }

  async findOne(id: string): Promise<UserInterface> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error(`Error finding user by ID ${id}:`, error);
      throw new Error('Failed to find user');
    }
  }

  async findByEmail(email: string) {
    this.logger.log(`Finding user with email: ${email}`);
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
    }
    return user;
  }
}
