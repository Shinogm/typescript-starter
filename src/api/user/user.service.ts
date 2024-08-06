import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
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
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const userRole = createUserDto.role || UserRole.USER;
    const createdUser = new this.userModel({
      ...createUserDto,
      role: userRole,
    });

    try {
      return await createdUser.save();
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<UserInterface[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new HttpException(
        'Error finding all users',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<UserInterface> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new HttpException(
          `User with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      console.error(`Error finding user by ID ${id}:`, error);
      throw new HttpException('Failed to find user', HttpStatus.BAD_REQUEST);
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
