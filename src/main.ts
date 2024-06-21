import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  //TODO off cors
  app.use(cookieParser());
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });
  //   app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:5173/');
  //   res.header('Access-Control-Allow-Credentials', true);
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
