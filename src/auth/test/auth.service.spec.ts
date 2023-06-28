import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth.service';
import { DatabaseModule } from '../../database/database.module';
import { Users } from '../../users/users.entity';
import { UsersService } from '../../users/users.service';
import Role from '../../users/role/role.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
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

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('AuthService should be defined', () => {
    expect(authService).toBeDefined();
  });

  // it('should return a user object when credentials are valid', async () => {
  //   const res = await authService.getAuthenticatedUser(
  //     'admin@gmail.com',
  //     'admin',
  //   );
  //   expect(res.roles).toEqual([Role.Admin]);
  // });

  // it('should return undefined when credentials are invalid', async () => {
  //   const res = authService.getAuthenticatedUser('qwerty@gmail.com', 'qwerty');
  //   await expect(res).rejects.toThrow(
  //     new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST),
  //   );
  // });

  // describe('getAuthenticatedUser', () => {
  //   it('should return the authenticated user', async () => {
  //     // Mock UsersService behavior
  //     const email = 'test@example.com';
  //     const plainTextPassword = 'password';
  //     const user = {
  //       id: 1,
  //       email: 'test@example.com',
  //       password: 'hashedPassword',
  //     };
  //     jest.spyOn(usersService, 'getUserByEmail').mockResolvedValue(user);
  //     jest.spyOn(authService, 'verifyPassword').mockResolvedValue(undefined);

  //     // Perform the getAuthenticatedUser request
  //     const result = await authService.getAuthenticatedUser(
  //       email,
  //       plainTextPassword,
  //     );

  //     // Assert the expected result
  //     expect(result).toEqual(user);
  //     expect(user.password).toBeUndefined();
  //   });
  //   it('should throw an HttpException if the credentials are wrong', async () => {
  //     // Mock UsersService behavior
  //     const email = 'test@example.com';
  //     const plainTextPassword = 'password';
  //     const user = {
  //       id: 1,
  //       email: 'test@example.com',
  //       password: 'hashedPassword',
  //     };
  //     jest.spyOn(usersService, 'getUserByEmail').mockResolvedValue(user);
  //     jest.spyOn(authService, 'verifyPassword').mockRejectedValue(undefined);

  //     // Perform the getAuthenticatedUser request
  //     let error: HttpException;

  //     try {
  //       await authService.getAuthenticatedUser(email, plainTextPassword);
  //     } catch (err) {
  //       error = err;
  //     }

  //     // Assert the expected error
  //     expect(error).toBeInstanceOf(HttpException);
  //     expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  //     expect(error.getResponse()).toBe('Wrong credentials provided');
  //   });
  // });

  // describe('verifyPassword', () => {
  //   it('should verify a plain text password against a hashed password', async () => {
  //     // Mock bcrypt.compare behavior
  //     jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

  //     // Perform the verifyPassword request
  //     await authService.verifyPassword('plainTextPassword', 'hashedPassword');

  //     // Assert bcrypt.compare was called with the correct arguments
  //     expect(bcrypt.compare).toHaveBeenCalledWith(
  //       'plainTextPassword',
  //       'hashedPassword',
  //     );
  //   });

  //   it('should throw an HttpException if the passwords do not match', async () => {
  //     // Mock bcrypt.compare behavior
  //     jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

  //     // Perform the verifyPassword request
  //     let error: HttpException;

  //     try {
  //       await authService.verifyPassword('plainTextPassword', 'hashedPassword');
  //     } catch (err) {
  //       error = err;
  //     }

  //     // Assert the expected error
  //     expect(error).toBeInstanceOf(HttpException);
  //     expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  //     expect(error.getResponse()).toBe('Wrong credentials provided');
  //   });
  // });

  // describe('login', () => {
  //   it('should return an access token', async () => {
  //     // Mock JwtService behavior
  //     const payload = { username: 'test', sub: 1 };
  //     const accessToken = 'mockAccessToken';
  //     jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

  //     // Perform the login request
  //     const result = await authService.login({ username: 'test', userId: 1 });

  //     // Assert the expected result
  //     expect(result).toEqual({ access_token: accessToken });
  //   });
  // });

  // describe('getCookieWithJwtToken', () => {
  //   it('should return a JWT token cookie string', async () => {
  //     // Mock ConfigService behavior
  //     const jwtExpirationTime = '3600';
  //     jest.spyOn(configService, 'get').mockReturnValue(jwtExpirationTime);

  //     // Mock JwtService behavior
  //     const payload = { userId: 1 };
  //     const token = 'mockToken';
  //     jest.spyOn(jwtService, 'sign').mockReturnValue(token);

  //     // Perform the getCookieWithJwtToken request
  //     const result = await authService.getCookieWithJwtToken(1);

  //     // Assert the expected result
  //     const expectedCookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtExpirationTime}`;
  //     expect(result).toEqual(expectedCookie);
  //   });
  // });

  // describe('register', () => {
  //   it('should register a user and return the created user', async () => {
  //     // Mock bcrypt.hash behavior
  //     const hashedPassword = 'hashedPassword';
  //     jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

  //     // Mock UsersService behavior
  //     const registrationData = {
  //       email: 'test@example.com',
  //       password: 'password',
  //     };
  //     const createdUser = { id: 1, email: 'test@example.com' };
  //     jest.spyOn(usersService, 'createUser').mockResolvedValue(createdUser);

  //     // Perform the register request
  //     const result = await authService.register(registrationData);

  //     // Assert the expected result
  //     expect(result).toEqual(createdUser);
  //     expect(createdUser.password).toBeUndefined();
  //   });

  //   it('should throw an HttpException if a user with the same email already exists', async () => {
  //     // Mock bcrypt.hash behavior
  //     const hashedPassword = 'hashedPassword';
  //     jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

  //     // Mock UsersService behavior
  //     const registrationData = {
  //       email: 'test@example.com',
  //       password: 'password',
  //     };
  //     const error = { code: 'UniqueViolation' };
  //     jest.spyOn(usersService, 'createUser').mockRejectedValue(error);

  //     // Perform the register request
  //     let httpException: HttpException;

  //     try {
  //       await authService.register(registrationData);
  //     } catch (err) {
  //       httpException = err;
  //     }

  //     // Assert the expected error
  //     expect(httpException).toBeInstanceOf(HttpException);
  //     expect(httpException.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  //     expect(httpException.getResponse()).toBe(
  //       'User with that email already exists',
  //     );
  //   });

  //   it('should throw an HttpException if an unexpected error occurs', async () => {
  //     // Mock bcrypt.hash behavior
  //     const hashedPassword = 'hashedPassword';
  //     jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

  //     // Mock UsersService behavior
  //     const registrationData = {
  //       email: 'test@example.com',
  //       password: 'password',
  //     };
  //     const error = { code: 'SomeOtherErrorCode' };
  //     jest.spyOn(usersService, 'createUser').mockRejectedValue(error);

  //     // Perform the register request
  //     let httpException: HttpException;

  //     try {
  //       await authService.register(registrationData);
  //     } catch (err) {
  //       httpException = err;
  //     }

  //     // Assert the expected error
  //     expect(httpException).toBeInstanceOf(HttpException);
  //     expect(httpException.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  //     expect(httpException.getResponse()).toBe('Something went wrong');
  //   });
  // });

  describe('getCookieForLogOut', () => {
    it('should return a log out cookie string', () => {
      // Perform the getCookieForLogOut request
      const result = authService.getCookieForLogOut();

      // Assert the expected result
      const expectedCookie = 'Authentication=; HttpOnly; Path=/; Max-Age=0';
      expect(result).toEqual(expectedCookie);
    });
  });
});
