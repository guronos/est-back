import { Module } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { RemindersModule } from '@entities/reminders/reminders.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule,
        UserModule,
        RemindersModule,
        AuthModule,
    ],
})
export class AppModule {}
