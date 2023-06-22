import {
  Body,
  Req,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import CreateUserDto from '../users/dto/createUser.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import Users from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto): Promise<Users> {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async validate(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;

    const cookie = await this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    const userCopy = JSON.parse(JSON.stringify(user));
    userCopy.password = undefined;

    return res.send(userCopy);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  authenticate(@Req() request: RequestWithUser): Users {
    const { user } = request;
    const userCopy = JSON.parse(JSON.stringify(user));
    userCopy.password = undefined;

    return userCopy;
  }
}
