import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app/app.controller';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appController = app.get(AppController);
  console.log(appController.getHello());
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.APP_PORT);
  console.log(`App is running on port ${process.env.APP_PORT}`);
}

bootstrap();

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Nest Intro')
    .setDescription('1.0')
    .addTag('Initial Version')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('internal/api', app, document);
};
