import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, ValidationPipe, UsePipes,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Cookies } from '@/helpers';

@Controller('reminders')
export class RemindersController {
    constructor(private readonly remindersService: RemindersService) {}

    @Post('/create')
    async create(
        @Body() createReminderDto: CreateReminderDto,
    ) {
        console.log('cont', createReminderDto);
        const result = await this.remindersService.create(createReminderDto);
        return {
            status: 'ok',
            ...result,
        };
    }

    @Post('/list')
    async findAll(@Body() body, @Cookies() cookie) {
        console.log('body', cookie.user);
        const userId: number = Number(cookie.user);
        // const filter = {query.dateStart, query.dateEnd};
        return await this.remindersService.findAll(body, userId);
    }

    @Patch('/update')
    async update(
        @Body() updateReminderDto: UpdateReminderDto,
    ) {
        //TODO редактирование карточки
        return await this.remindersService.update(updateReminderDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.remindersService.remove(id);
    }
}
