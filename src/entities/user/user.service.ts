import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { pepperIt } from 'src/helpers';
import { AuthService } from '@/components/auth/auth.service';
import { Response } from 'express';
import { CreateUserDto } from '@entities/user/dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @Inject(forwardRef(() => AuthService))
    // private authService: AuthService,
  ) {}

  public async createUser(userData: CreateUserDto, res: Response) {
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
        birthDate: userData.birthDate,
      });
      console.log('newUser', newUser);
      const saveUser = await this.userRepository.save(newUser);
      delete saveUser.password;
      delete saveUser.refreshHash;
      // console.log('saveUser', this.authService.signIn);
      // TODO логика подтверждения email
      // TODO выдача токенов
      // await this.authService.signIn(userData.email, userData.password, res);
      return saveUser;
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
