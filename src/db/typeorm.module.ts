import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSRGRES_HOST,
      port: Number(process.env.POSRGRES_PORT),
      username: process.env.POSRGRES_USERNAME,
      password: process.env.POSRGRES_PASSWORD,
      database: process.env.POSRGRES_DATABASE,
      entities: ['dist/entities/**/*.entity.js'],
      // migrations: ['dist/db/migrations/**/*.js'],
      synchronize: true,
    }),
  ],
})
export class TypeOrmModule {}
