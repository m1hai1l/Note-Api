import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
    @ApiProperty({ example: 'example@gmail.com', description: "Почта пользователя" })
    @IsString()
    email: string;

    @ApiProperty({ example: 'example_123', description: "Пароль пользователя" })
    @IsString()
    password: string;
}