import { Injectable } from '@nestjs/common';
import { Note } from './schemas/note.schema';
import { NoteDto } from './dto/note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private readonly NoteModule: Model<Note>) { }

    async findAll(): Promise<Note[]> {
        return this.NoteModule.find().exec()
    }

    async findId(id: string): Promise<Note | null> {
        return this.NoteModule.findById(id).exec()
    }

    async create(createDto: Omit<NoteDto, '_id'>): Promise<Note> {
        const create = await this.NoteModule.create(createDto)
        return create;
    }

    async findTitle(title: string): Promise<Note[]> {
        return this.NoteModule.find({ $text: { $search: title } }).exec()
    }

    async update(id: string, updateDto: Pick<NoteDto, 'note'>): Promise<Note | null> {
        return this.NoteModule.findByIdAndUpdate({ _id: id }, updateDto, { new: true }).exec()
    }

    async delete(id: string): Promise<Note | null> {
        return this.NoteModule.findByIdAndDelete({ _id: id }).exec()
    }


}
