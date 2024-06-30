import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { pepperIt } from 'src/helpers';
import {<<<<<<< HEAD
import { formatISO9075, fromUnixTime } from 'date-fns';
=======
import { formatISO9075, fromUnixTime } from "date-fns";
>>>>>>> 8127793fa43b082ced509e5c1a38bad3924d1c5d

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(userData: any) {
    const exists = await this.userRepository.exists({
      where: {
        email: userData.email,
      },
      cache: true,
    });
    console.log('exists', exists);
    if (exists) {
      throw new HttpException('E-mail уже занят', HttpStatus.UNAUTHORIZED);
    }
    // userData.birthDate = formatISO9075(fromUnixTime(1719704251));
    const phoneUponReg = userData.phone;
    userData.phoneUponReg = phoneUponReg;
    const salt = await genSalt(12);
    const hashedPassword = await hash(
      pepperIt(userData.password, phoneUponReg),
      salt,
    );
    try {
      console.log('hashedPassword', hashedPassword);
      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
<<<<<<< HEAD
        birthDate: formatISO9075(fromUnixTime(userData.birthDate)),
      });
      console.log('newUser', newUser);
      return await this.userRepository.save(newUser);
=======
        birthDate: formatISO9075(fromUnixTime(userData.birthDate))
      });
      console.log('newUser', newUser);
      const saveUser = await this.userRepository.save(newUser);
      console.log('saveUser', saveUser);
      // TODO логика подтверждения email
      // TODO выдача токенов
      return saveUser;
>>>>>>> 8127793fa43b082ced509e5c1a38bad3924d1c5d
    } catch (e) {
      throw new HttpException(
        'Ошибка создания пользователя',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public async checkEmail(email: string) {
    const exists = await this.userRepository.exists({
      where: {
        email: email,
      },
      cache: true,
    });
    if (exists) {
      throw new HttpException('E-mail уже занят', HttpStatus.UNAUTHORIZED);
    } else return true;
  }

  public async getUserData(id: number) {
    return await this.userRepository.findOneOrFail({
      where: { id },
    });
  }
  public async getUserByEmail(email: string) {
    console.log(email);
    return await this.userRepository.findOneOrFail({
      where: { email },
      cache: true,
    });
  }

  public async getAllUsers() {
    return await this.userRepository.find({
      select: [
        'birthDate',
        'email',
        'firstName',
        'id',
        'isAcceptedCookies',
        'middleName',
        'phone',
        'sex',
      ],
      cache: true,
    });
  }

  public async updateUser(id: number, body: UpdateUserDTO) {
    await this.userRepository.update(
Token(id: number, refreshToken: string) {
    return await this.userRepository.update(
      {
        id,
      },
      {
        refreshHash: refreshToken,
      },
    );
  }

  public async getRefreshToken(id: number) {
    const userHash = await this.userRepository.findOneOrFail({
      where: { id },
      select: ['refreshHash'],
    });
    return userHash.refreshHash;
  }
}
