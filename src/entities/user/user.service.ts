import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { pepperIt } from 'src/helpers';

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
    });
    if (exists) {
      throw new HttpException('E-mail уже занят', HttpStatus.UNAUTHORIZED);
    }
    const phoneUponReg = userData.phone;
    userData.phoneUponReg = phoneUponReg;
    const salt = await genSalt(12);
    const hashedPassword = await hash(
      pepperIt(userData.password, phoneUponReg),
      salt,
    );
    try {
      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new HttpException(
        'Ошибка создания пользователя',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public async getUserData(id: number) {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }
  public async getUserByEmail(email) {
    console.log(email);
    return await this.userRepository.findOneOrFail({
      where: { email },
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
        'login',
        'middleName',
        'phone',
        'sex',
      ],
    });
  }

  public async updateUser(id: number, body: UpdateUserDTO) {
    this.userRepository.update(
      {
        id,
      },
      body,
    );
  }

  public async updateRefreshToken(id: number, refreshToken: string) {
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
