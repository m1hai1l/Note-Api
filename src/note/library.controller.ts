import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';
import { AuthGuard } from '@nestjs/passport';
import { TelegramService } from 'src/telegram/telegram.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Операции над текстовыми блоками')
@Controller('notes')
export class LibraryController {
    constructor(
        private readonly noteService: NoteService,
        private readonly notif: TelegramService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Получение всех блоков' })
    @ApiResponse({ type: NoteDto, status: 200 })
    async noteAll() {
        return this.noteService.findAll()
    }

    @Get(':title')
    @ApiResponse({ type: NoteDto, status: 200 })
    @ApiOperation({ summary: 'Получение блоков по названию' })
    async noteTitle(@Param('title') note: string) {
        return this.noteService.findTitle(note)
    }

    @Get(':id')
    @ApiResponse({ type: NoteDto, status: 200 })
    @ApiOperation({ summary: 'Получение блоков по Id' })
    async noteId(@Param('id') id: string) {
        return this.noteService.findId(id)
    }

    @ApiOperation({ summary: 'Создание текстового блока' })
    @ApiResponse({ type: NoteDto, status: 200 })
    @UseGuards(AuthGuard('jwt'))
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer токен (например, Bearer eyJhbGciOiJIUzI1NiIsInR...)'
    })
    @UsePipes(new ValidationPipe())
    @Post()
    async notePost(@Body() dto: NoteDto) {
        await this.notif.NotifyTel(`Появилась новая запись: ${dto.title}\nOт автора: ${dto.author}`)
        return this.noteService.create(dto)
    }

    @ApiOperation({ summary: 'Обновление блока' })
    @UseGuards(AuthGuard('jwt'))
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer токен (например, Bearer eyJhbGciOiJIUzI1NiIsInR...)'
    })
    @UsePipes(new ValidationPipe())
    @ApiResponse({ type: NoteDto, status: 200 })
    @Patch(':id')
    async notePath(@Param('id') id: string, @Body() dto: Pick<NoteDto, "note">) {
        return this.noteService.update(id, dto)
    }

    @ApiOperation({ summary: 'Удаление блока' })
    @UseGuards(AuthGuard('jwt'))
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer токен (например, Bearer eyJhbGciOiJIUzI1NiIsInR...)'
    })
    @ApiResponse({ type: NoteDto, status: 200 })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.noteService.delete(id)
    }
}

