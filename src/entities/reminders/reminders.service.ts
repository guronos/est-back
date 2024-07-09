import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminders } from './reminders.entity';
import { Between, Equal, Repository } from 'typeorm';
import { endOfDay, formatISO9075, fromUnixTime } from 'date-fns';
import type { I_Filter_Find_All } from '@entities/reminders/types';
import {
    E_Priority_Reminders,
    E_Status_Reminders,
    E_Types_Actions,
} from '@entities/reminders/types';
import { User } from '@entities/user/user.entity';

@Injectable()
export class RemindersService {
    constructor(
        @InjectRepository(Reminders)
        private readonly remindersRepository: Repository<Reminders>,
    ) {}

    public async create(createReminder: CreateReminderDto) {
        console.log('createReminder', createReminder);
        try {
            // createReminder.dateAction = formatISO9075(
            //     fromUnixTime(Number(createReminder.dateAction)),
            // );
            // createReminder.status = E_Status_Reminders[createReminder.status];
            // createReminder.typeAction =
            //     E_Types_Actions[createReminder.typeAction];
            // createReminder.priorityType =
            //     E_Priority_Reminders[createReminder.priorityType];
            const specimen = this.remindersRepository.create(createReminder);
            const result = await this.remindersRepository.save(specimen);
            if (result) {
                return {
                    statusCode: 200,
                    data: result,
                };
            } else {
                throw new HttpException(
                    'Ошибка создания записи',
                    HttpStatus.BAD_REQUEST,
                );
            }
        } catch (e) {
            console.log(e);
            throw new HttpException(
                'Ошибка создания записи',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findAll(payload: { filter: I_Filter_Find_All }, userId: number) {
        try {
            const filter: I_Filter_Find_All = payload.filter;
            console.log(userId);
            const dateStart: string = formatISO9075(
                fromUnixTime(filter.dateStart),
            );
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
                    'userId',
                    'priorityType',
                    'status',
                    'typeAction',
                ],
            });
            // data[user]
            console.log('findAll', data);
            return {
                data,
            };
        } catch (e) {
            throw new HttpException(
                'Записи по указанным критериям не найдены',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(updateReminderDto: UpdateReminderDto) {
        const { id, ...data } = updateReminderDto;
        // await this.remindersRepository.update(id, data);
        const specimen = await this.remindersRepository.findOne({
            where: { id },
        });
        const result = await this.remindersRepository.save({ ...specimen, ...data });
        return {
            statusCode: 200,
            data: result,
        };
    }

    async remove(id: string) {
        try {
            const statusRemove = await this.remindersRepository.delete(id);
            if (statusRemove) {
                return {
                    statusCode: 200,
                    data: {
                        id,
                    },
                };
            } else {
                throw new HttpException(
                    'Ошибка удаления записи',
                    HttpStatus.BAD_REQUEST,
                );
            }
        } catch (e) {
            throw new HttpException(
                'Ошибка удаления записи',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
