import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { AllExceptionsFilter } from './common/providers/filters';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from './common/providers/pipes/validation.pipe';
import { TransformInterceptor } from './common/providers/interceptors';
import 'dotenv/config';

//Para utilizar HTTPS...
/* const httpsOptions = {
  key: fs.readFileSync('./secrets/private-key.pem'),
  cert: fs.readFileSync('./secrets/public-certificate.pem'), */

async function bootstrap() {
  const app = await NestFactory.create(AppModule /* , { httpsOptions } */);
  await app.listen(process.env.PORT);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new TransformInterceptor());

  console.log(`Server Listening at: ${await app.getUrl()}`);
}
bootstrap();
