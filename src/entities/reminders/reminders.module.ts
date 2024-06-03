import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminders } from './reminders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reminders])],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}
