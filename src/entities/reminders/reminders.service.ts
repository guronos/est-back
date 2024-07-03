import { Injectable } from "@nestjs/common";
import { CreateReminderDto } from "./dto/create-reminder.dto";
import { UpdateReminderDto } from "./dto/update-reminder.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Reminders } from "./reminders.entity";
import { Between, Repository, Equal } from "typeorm";
import { endOfDay, formatISO9075, fromUnixTime } from "date-fns";
import type { I_Filter_Find_All } from '@entities/reminders/types';

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

  async findAll(payload: { filter: I_Filter_Find_All }, userId: number) {
    const filter: I_Filter_Find_All = payload.filter;
    console.log(userId);
    const dateStart: string = formatISO9075(fromUnixTime(filter.dateStart));
    const dateEnd: string = formatISO9075(
      endOfDay(fromUnixTime(filter.dateEnd)),
    );
    const data: Reminders[] = await this.remindersRepository.find({
      where: {
        dateAction: Between(dateStart, dateEnd),
        user: Equal(userId),
      },
      order: {
        dateAction: 'ASC',
      },
      take: 100,
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
