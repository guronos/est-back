import { UserService } from '@entities/user/user.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { pepperIt } from 'src/helpers';
import { JwtService } from '@nestjs/jwt';
import crypto = require('crypto');
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    public async signIn(
        email: string,
        password: string,
        res: Response,
    ): Promise<any> {
        try {
            const user = await this.userService.getUserByEmail(email);
            // if (!user) {
            //   return {
            //     errorUser: true,
            //   };
            // }
            const isMath = await compare(
                pepperIt(password, user.phoneUponReg),
                user.password,
            );
            if (!isMath) {
                return {
                    statusCode: 401,
                    errorPassword: true,
                };
            }
            const payload = { sub: user.id };
            const setAssess = await this.setAssessToken(payload, res);
            const setRefresh = await this.setRefreshToken(payload, res);
            console.log(setRefresh, setAssess);
            if (setAssess && setRefresh) {
                return {
                    statusCode: 200,
                    message: 'Success',
                    userId: user.id,
                };
            }
            // throw new HttpException(
            //   'Ошибка присвоения токенов',
            //   HttpStatus.UNAUTHORIZED,
            // );
        } catch (e) {
            console.log('Error', e);
            return false;
        }
    }

    public async setAssessToken(payload, res: Response) {
        try {
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '20s',
            });
            res.cookie('assess', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 50,
                secure: true,
                sameSite: 'strict',
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    public async setRefreshToken(payload, res) {
        try {
            const refreshTokenHash = crypto.randomBytes(64).toString('base64');
            const fullRefreshToken = process.env.JWT_REFRESH + refreshTokenHash;
            const saveToken = await this.userService.updateRefreshToken(
                payload.sub,
                refreshTokenHash,
            );
            if (saveToken.affected) {
                const refteshJWT = await this.jwtService.signAsync(payload, {
                    secret: fullRefreshToken,
                    expiresIn: '50d',
                });
                res.cookie('refresh', refteshJWT, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 50,
                    secure: true,
                    sameSite: 'strict',
                });
                res.cookie('user', payload.sub, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 50,
                    secure: true,
                    sameSite: 'strict',
                });
            }
            return true;
        } catch (e) {
            return false;
        }
    }
}
