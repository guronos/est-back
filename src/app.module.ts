import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { RemindersModule } from '@entities/reminders/reminders.module';
import { AuthModule } from './components/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule,
        UserModule,
        RemindersModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
