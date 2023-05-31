import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import Role from '../users/role/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, ConfigService],
      imports: [
        TypeOrmModule.forFeature([Users]),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('AuthService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user object when credentials are valid', async () => {
    const res = await service.getAuthenticatedUser('admin@gmail.com', 'admin');
    expect(res.roles).toEqual([Role.Admin]);
  });

  // it('should return undefined when credentials are invalid', async () => {
  //   const res = await service.getAuthenticatedUser(
  //     'qwerty@gmail.com',
  //     'qwerty',
  //   );
  //   await expect(res).rejects.toThrow(
  //     new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST),
  //   );
  // });

  // it('should return JWT object when credentials are valid', async () => {
  //   const user = await service.getAuthenticatedUser('admin@gmail.com', 'admin');
  //   const res = await service.login(user);
  //   expect(res).toBeDefined();
  // });
});
