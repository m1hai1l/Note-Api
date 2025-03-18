import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { ApiResponse } from '@nestjs/swagger';

@Module({
    imports: [ServeStaticModule.forRoot({
        rootPath: `${path}/uploads`,
        serveRoot: `file/static`
    })],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule { }
