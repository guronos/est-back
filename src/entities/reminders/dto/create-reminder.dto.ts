import { User } from '@entities/user/user.entity';
import {
    E_Status_Reminders,
    E_Priority_Reminders,
    E_Types_Actions,
} from '../types';
import { IsEmpty, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { getCorrectData } from '@/helpers';

export class CreateReminderDto {
    @IsEmpty()
    id: undefined;
    @IsString()
    title: string;
    @IsString()
    body: string;
    @IsEnum(E_Status_Reminders)
    status: E_Status_Reminders;

    @Transform(getCorrectData)
    @IsNotEmpty()
    dateAction: string;
    @IsInt()
    author: number;
    @IsInt()
    userId: number;
    @IsEnum(E_Priority_Reminders)
    priorityType: E_Priority_Reminders;
    @IsEnum(E_Types_Actions)
    typeAction: E_Types_Actions;
}
