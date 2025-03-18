import { Controller, Get, HttpCode, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileRes } from './dto/file.dto';
import { Mfile } from './dto/mfile';
import { ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Получение и отправка изображения')
@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @HttpCode(200)
    @ApiOperation({ summary: "Загрузка файла", description: "Загрузите файл. Запрос должен быть типа multipart/form-data." })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ type: [FileRes], status: 201 })
    @ApiHeader({ name: 'Content-Type', description: 'Должен быть установлен как multipart/form-data' })
    @UseInterceptors(FileInterceptor('files'))
    async upload(@UploadedFile() file: Express.Multer.File): Promise<FileRes[]> {
        const saves: Mfile[] = [new Mfile(file)]
        if (file.mimetype.includes('image')) {
            const buf = await this.fileService.convWebp(file.buffer)
            saves.push(new Mfile({
                originalname: `${file.originalname.split('.')[0]}.webp`,
                buffer: buf
            }))
        }
        return this.fileService.upload(saves);
    }

    @Get('static/:filename')
    @ApiOperation({ summary: 'Получить файл изображения' })
    @ApiResponse({ status: 200, description: 'Изображение успешно получено', content: { 'image/*': {} } })
    @ApiResponse({ status: 404, description: 'Файл не найден' })
    getImage(@Param('filename') filename: string) {
        // Логика не требуется, так как ServeStaticModule обрабатывает запрос
    }
}