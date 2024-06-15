import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { UserService } from '@entities/user/user.service';
// import { User } from '@entities/user/user.entity';
import { UserModule } from '@entities/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
