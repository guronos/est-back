import { User } from '@entities/user/user.entity';
import {
  E_Status_Reminders,
  E_Priority_Reminders,
  E_Types_Actions,
} from '../types';

export class CreateReminderDto {
  title: string;
  body: string;
  status: E_Status_Reminders;
  dateAction: Date;
  author: number;
  user: User;
  priorityType: E_Priority_Reminders;
  typeAction: E_Types_Actions;
}
