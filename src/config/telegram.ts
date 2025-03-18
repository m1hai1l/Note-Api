import { ConfigService } from '@nestjs/config'

export const options = async (conf: ConfigService) => {
    return {
        tocen: conf.get('TELEGRAM_API'),
        chat_id: conf.get('CHAT_ID')
    }
}