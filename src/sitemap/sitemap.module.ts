import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { LibraryModule } from 'src/note/library.module';
import { SitemapService } from './sitemap.service';
import { NoteService } from 'src/note/note.service';

@Module({
    controllers: [SitemapController],
    imports: [LibraryModule],
    providers: [SitemapService]
})
export class SitemapModule { }
