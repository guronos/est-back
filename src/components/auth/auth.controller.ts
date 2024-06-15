import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies, NonAuth } from 'src/helpers';
import { Auth_Data_DTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @NonAuth()
  @Post()
  async signIn(
    @Res({ passthrough: true }) res,
    @Body() authData: Auth_Data_DTO,
    @Cookies() cookies: any,
  ) {
    console.log('cookie', cookies);
    const { email, password } = authData;
    const isAuth = await this.authService.signIn(email, password, res);
    if (!isAuth) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      // TODO добавить рефреш
      // res.cookie('refresh', String('Ivan'), {
      //   httpOnly: true,
      //   maxAge: 1000 * 60 * 60 * 24 * 50, // 1 week
      //   secure: true,
      // });
    }
    console.log('cookie', cookies);
    return isAuth;
  }
}
