import { UserService } from '@entities/user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { pepperIt } from 'src/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    console.log(email, password);
    const user = await this.userService.getUserByEmail(email);
    console.log('user', user);
    if (!user) return false;
    const isMath = await compare(
      pepperIt(password, user.phoneUponReg),
      user.password,
    );
    if (!isMath) {
      return false;
    }
    console.log(isMath);
    const payload = { sub: user.id, userLogin: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
