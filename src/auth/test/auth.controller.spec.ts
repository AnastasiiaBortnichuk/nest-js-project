import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { DatabaseModule } from '../../database/database.module';
import { Users } from '../../users/users.entity';
import { UsersService } from '../../users/users.service';
import { TestUser } from '../../../test/common';
import RequestWithUser from '../interfaces/requestWithUser.interface';

describe('AuthController', () => {
  let moduleRef: TestingModule;
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService, ConfigService],
      imports: [
        TypeOrmModule.forFeature([Users]),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
          secret: 'secretKey',
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('register', () => {
    const registeredUser = { id: 1, ...TestUser };
    it('should register a user', async () => {
      jest.spyOn(authService, 'register').mockResolvedValue(registeredUser);
      const result = await authController.register(TestUser);

      expect(result).toEqual(registeredUser);
    });
  });

  describe('validate', () => {
    const req = {
      user: { id: 1, ...TestUser },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    const jwtCookie = 'mockJwtCookie';

    it('should validate user credentials and return user data with JWT cookie', async () => {
      jest
        .spyOn(authService, 'getCookieWithJwtToken')
        .mockResolvedValue(jwtCookie);

      await authController.validate(req as RequestWithUser, res as any);

      expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', jwtCookie);
      expect(res.send).toHaveBeenCalledWith({
        id: 1,
        ...TestUser,
        password: undefined,
      });
    });
  });

  describe('logOut', () => {
    const req = {};
    const res = {
      setHeader: jest.fn(),
      sendStatus: jest.fn(),
    };
    const logoutCookie = 'mockLogoutCookie';

    it('should log out the user by setting the log out cookie', async () => {
      jest
        .spyOn(authService, 'getCookieForLogOut')
        .mockReturnValue(logoutCookie);

      await authController.logOut(req as any, res as any);

      expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', logoutCookie);
      expect(res.sendStatus).toHaveBeenCalledWith(HttpStatus.OK);
    });
  });

  describe('authenticate', () => {
    it('should return authenticated user data', () => {
      const req = {
        user: { id: 1, ...TestUser, password: undefined },
      };

      const result = authController.authenticate(req as any);

      expect(result).toEqual({ id: 1, ...TestUser, password: undefined });
    });
  });
});
