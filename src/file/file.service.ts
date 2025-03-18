import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import { FileRes } from './dto/file.dto';
import * as sharp from 'sharp';
import { Mfile } from './dto/mfile';

@Injectable()
export class FileService {

    async upload(files: Mfile[]): Promise<FileRes[]> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd');
        const uploadFolder = `${path}/uploads/${dateFolder}`;
        await ensureDir(uploadFolder);

        const res: FileRes[] = [];
        for (let file of files) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
            res.push({ url: `${uploadFolder}/${file.originalname}`, name: file.originalname })
        }
        return res;
    }

    async convWebp(file: Buffer): Promise<Buffer> {
        return sharp(file)
            .webp()
            .toBuffer();
    }
}
