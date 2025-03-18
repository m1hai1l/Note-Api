import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiTags, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Note manager")
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document)

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
