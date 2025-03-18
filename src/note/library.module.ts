import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { NoteService } from './note.service';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]), TelegramModule],
    controllers: [LibraryController],
    providers: [NoteService],
    exports: [NoteService]
})
export class LibraryModule { }
