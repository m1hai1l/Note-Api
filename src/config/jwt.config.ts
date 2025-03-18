import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const jwt = async (conf: ConfigService): Promise<JwtModuleOptions> => {
    return {
        secret: conf.get('JWT_SECRET')
    }
}