import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongo = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
    return {
        uri: MongoUri(configService)
    }
}

const MongoUri = (configService: ConfigService) => {

    const LOGIN = configService.get('MONGO_LOGIN');
    const PASSWORD = configService.get('MONGO_PASSWORD');
    const DB = configService.get('MONGO_DATABASE');
    const HOST = configService.get('MONGO_HOST');
    const PORT = configService.get('MONGO_PORT');

    return `mongodb://${LOGIN}:${PASSWORD}@${HOST}:${PORT}/${DB}`;
}

