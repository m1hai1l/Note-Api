import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MinLength } from 'class-validator';

export class NoteDto {
    @ApiProperty({ example: "67c9591d9dd7f27b6306db3a", description: 'Уникальный идентификатор' })
    _id: string;

    @ApiProperty({ example: "Разработка на NestJS" })
    @MinLength(3)
    @IsString()
    title: string;

    @ApiProperty({ example: "Много текста" })
    @IsString()
    note: string;

    @ApiProperty({ example: "Senior Node.js разработчик" })
    @IsString()
    author: string;

    @ApiProperty({ example: ["Node.js", "NestJS", "Маштабируемые системы"] })
    @IsArray()
    tag: string[];
}