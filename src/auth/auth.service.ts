import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name) private AuthModule: Model<Auth>, private readonly jwtService: JwtService) { }

    async create(CreateDto: AuthDto) {
        const salt = await genSalt(10);
        const user = new this.AuthModule({
            email: CreateDto.email,
            password: await hash(CreateDto.password, salt)
        });
        return user.save();
    }

    async search(email: string) {
        return this.AuthModule.findOne({ email }).exec();
    }

    async login(dto: AuthDto) {
        const user = await this.search(dto.email);
        if (!user) {
            throw new BadRequestException()
        }
        const pass = await compare(dto.password, user.password);
        if (!pass) {
            throw new UnauthorizedException();
        }
        return user.email
    }

    async tocken(email: string) {
        const payload = { email };
        return {
            access_tocken: await this.jwtService.signAsync(payload)
        }
    }
}
