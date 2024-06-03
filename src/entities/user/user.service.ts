import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(userData: any) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(userData.password, salt);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  public async getUserData(id: number) {
    return await this.userRepository.findOne({ where: { id } });
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
}
