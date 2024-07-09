import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateReminderDto } from './create-reminder.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateReminderDto extends PartialType(
    OmitType(CreateReminderDto, ['id'] as const),
) {
    @IsNotEmpty()
    // @IsUUID()
    id: string;
}
