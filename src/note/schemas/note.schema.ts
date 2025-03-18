import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';


export type NoteType = HydratedDocument<Note>

@Schema()
export class Note {
    _id: string;

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    note: string;

    @Prop({ required: true })
    author: string;

    @Prop()
    tag: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
NoteSchema.index({ title: 'text' })