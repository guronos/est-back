import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/helpers';
import { UserService } from '@entities/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = await context.switchToHttp().getRequest();
    const response = await context.switchToHttp().getResponse();
    const token = request.cookies.assess; //this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payloadAssess = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (payloadAssess) request['user'] = payloadAssess;
    } catch (e) {
      try {
        const jwtRefresh = request.cookies.refresh;
        const userId = parseInt(request.cookies.user);
        if (jwtRefresh && userId) {
          const getUserHash = await this.userService.getRefreshToken(userId);
          const payloadRefresh = await this.jwtService.verifyAsync(jwtRefresh, {
            secret: process.env.JWT_REFRESH + getUserHash,
          });
          if (payloadRefresh) {
            await this.authService.setAssessToken(
              { sub: payloadRefresh.sub },
              response,
            );
            await this.authService.setRefreshToken(
              {
                sub: payloadRefresh.sub,
              },
              response,
            );
            return true;
          }
          throw new UnauthorizedException();
        } else {
          throw new UnauthorizedException();
        }
      } catch (e) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
