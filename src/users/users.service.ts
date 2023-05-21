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

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findUser(username: string): Promise<Users | undefined> {
    const user = (await this.usersRepository.find()).find(
      (user) => user.username === username,
    );
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(email: string): Promise<Users | undefined> {
    const user = (await this.usersRepository.find()).find(
      (user) => user.email === email,
    );
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = (await this.usersRepository.find()).find(
      (user) => user.id === id,
    );
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
