import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Регистрация и авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @ApiOperation({ summary: "Регистрация пользователя" })
    @ApiResponse({ status: 200 })
    @Post('registration')
    async create(@Body() dto: AuthDto) {
        const user = await this.authService.search(dto.email)
        if (user) {
            throw new BadRequestException()
        }
        return this.authService.create(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @ApiOperation({ summary: "Авторизация пользователя" })
    @ApiResponse({ example: "eyJhbGciOiJIUzI1NiIsInR...", status: 200 })
    @Post('login')
    async login(@Body() dto: AuthDto) {
        const email = await this.authService.login(dto);
        return await this.authService.tocken(email);
    }

}
