import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type AuthType = HydratedDocument<Auth>

@Schema()
export class Auth {

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);