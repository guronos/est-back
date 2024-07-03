import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Cookies } from "@/helpers";

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post('/create')
  async create(@Body() createReminderDto: CreateReminderDto) {
    const result = await this.remindersService.create(createReminderDto);
    return {
      status: 'ok',
      ...result,
    };
  }

  @Post('/list')
  findAll(@Body() body, @Cookies() cookie) {
    console.log('body', cookie.user);
    const userId: number = Number(cookie.user);
    // const filter = {query.dateStart, query.dateEnd};
    return this.remindersService.findAll(body, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remindersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.remindersService.update(+id, updateReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remindersService.remove(+id);
  }
}
