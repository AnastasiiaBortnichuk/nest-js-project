import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAllUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async createUser(userData: CreateUserDto): Promise<Users | undefined> {
    const existingUser = await this.getUserByEmail(userData.email);
    if (!existingUser) {
      const newUser = this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);

      return newUser;
    }
    throw new HttpException(
      'User with this email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  async getUserByEmail(email: string): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserById(id: number): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
