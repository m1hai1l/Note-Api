import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwt } from '../config/jwt.config';
import { JwtStratagy } from './strategies/jwt.strategies';


@Module({
    imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
        ConfigModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: jwt
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStratagy]
})

export class AuthModule { }
