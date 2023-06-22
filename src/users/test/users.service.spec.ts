import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from '../../../test/common';
import { DatabaseModule } from '../../database/database.module';
import { Users } from '../users.entity';
import { UsersService } from '../users.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  const TotalUsers = 6;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        TypeOrmModule.forFeature([Users]),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('UsersService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllUsers should work', async () => {
    const result = await service.getAllUsers();
    expect(result.length).toEqual(TotalUsers);
  });

  // it('createUser should work', async () => {
  //   const result = await service.createUser(TestUser);
  //   expect(result).toEqual({ ...TestUser, id: '8' });
  // });

  it('should throw HttpException when user id is invalid', async () => {
    const result = service.getUserById(9);
    await expect(result).rejects.toEqual(
      new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      ),
    );
  });
});
