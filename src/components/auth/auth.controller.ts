import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies, NonAuth } from "src/helpers";
import { Auth_Data_DTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @NonAuth()
  @Post()
  @HttpCode(200)
  async signIn(
    @Res({ passthrough: true }) res,
    @Body() authData: Auth_Data_DTO,
  ) {
    const { email, password } = authData;
    const isAuth = await this.authService.signIn(email, password, res);
    console.log('status', isAuth);
    if (!isAuth) {
      throw new HttpException(
        'Пользователь с указанным e-mail не зарегистрирован',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (isAuth.errorPassword) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }
    return isAuth;
  }

  @Post('/check')
  @HttpCode(200)
  async checkAuth(@Cookies() cookie) {
    return {
      statusCode: 200,
      userId: cookie.user,
    };
  }
}
