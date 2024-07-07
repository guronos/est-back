import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { E_Sex } from '../types';

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsString()
    phone: string;
    phoneUponReg?: string;
    @IsString()
    password: string;
    @IsString()
    passwordRepeat: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    middleName: string;
    @IsString()
    birthDate: Date;
    @IsNotEmpty()
    sex: E_Sex;
    @IsString()
    city: string;
    @IsBoolean()
    isAcceptedCookies: boolean;
}
