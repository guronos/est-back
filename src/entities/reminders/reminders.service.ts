import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminders } from './reminders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminders)
    private readonly remindersRepository: Repository<Reminders>,
  ) {}

  public async create(createReminderDto: CreateReminderDto) {
    const result = this.remindersRepository.create(createReminderDto);
    return await this.remindersRepository.save(result);
  }

  async findAll() {
    const data = await this.remindersRepository.find({
      select: [
        'title',
        'body',
        'author',
        'dateAction',
        'dateCreate',
        'id',
        'priorityType',
        'status',
        'typeAction',
      ],
    });
    return data;
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
