import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: 'http://localhost:5173',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        },
    });
    app.use(helmet());
    //TODO off cors
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });
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
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.listen(3000);
}
bootstrap();
