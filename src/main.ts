import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';

async function bootstrap() {
  // AWS configuration setup
  AWS.config.update({
    region: process.env.COGNITO_REGION,
    credentials: {
      accessKeyId: process.env.AWS_IAM_ACCESS_KEY_ID!,  // Assert that the value is defined
      secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY!,  // Assert that the value is defined
    },
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();