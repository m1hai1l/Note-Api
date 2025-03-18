import { ApiProperty } from '@nestjs/swagger';

export class FileRes {
    @ApiProperty({})
    url: string;

    @ApiProperty({})
    name: string;
}