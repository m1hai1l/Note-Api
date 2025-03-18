import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LibraryModule } from './note/library.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongo } from './config/mongo.config';
import { FileModule } from './file/file.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { TelegramModule } from './telegram/telegram.module';



@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongo
        }),

        AuthModule,
        LibraryModule,
        FileModule,
        SitemapModule,
        TelegramModule
    ]
})
export class AppModule { }
