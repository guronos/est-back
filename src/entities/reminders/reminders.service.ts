import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminders } from './reminders.entity';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Between } from 'typeorm';
import { format, fromUnixTime, formatISO9075, endOfDay } from 'date-fns';
import { formatWithOptions } from 'date-fns/fp';
import { ru } from 'date-fns/locale';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminders)
    private readonly remindersRepository: Repository<Reminders>,
  ) {}

  public async create(createReminder: CreateReminderDto) {
    createReminder.dateAction = formatISO9075(
      fromUnixTime(Number(createReminder.dateAction)),
    );
    const result = this.remindersRepository.create(createReminder);
    return await this.remindersRepository.save(result);
  }

  async findAll(payload: any) {
    const filter = payload.filter;
    const dateStart = formatISO9075(fromUnixTime(filter.dateStart));
    const dateEnd = formatISO9075(endOfDay(fromUnixTime(filter.dateEnd)));
    const data = await this.remindersRepository.find({
      where: {
        dateAction: Between(dateStart, dateEnd),
      },
      order: {
        dateAction: 'ASC',
      },
      cache: true,
      select: [
        'title',
        'body',
        'author',
        'dateAction',
        'dateCreate',
        'id',
        'user',
        'priorityType',
        'status',
        'typeAction',
      ],
    });
    console.log('findAll', data);
    return {
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} reminder`;
  }

  update(id: number, updateReminderDto: UpdateReminderDto) {
    return `This action updates a #${id} reminder`;
  }

  remove(id: number) {
    return `This action removes a #${id} reminder`;
  }
}
