import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
    bot: Telegraf
    tocen: string
    chat_id: string

    constructor(private readonly conf: ConfigService) {
        this.tocen = <string>this.conf.get('TELEGRAM_API')
        this.chat_id = <string>this.conf.get('CHAT_ID')

        this.bot = new Telegraf(this.tocen)
    }

    async NotifyTel(message: string) {
        await this.bot.telegram.sendMessage(this.chat_id, message)
    }

}
