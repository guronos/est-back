import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NonAuth } from 'src/helpers';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @NonAuth()
  @Post()
  async signIn(@Body() authData) {
    console.log(authData);
    const { email, password } = authData;
    const isAuth = await this.authService.signIn(email, password);
    if (!isAuth) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return isAuth;
  }
}
