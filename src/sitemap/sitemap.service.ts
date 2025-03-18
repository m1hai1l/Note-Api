import { Injectable } from '@nestjs/common';
import { NoteService } from 'src/note/note.service';
import { create } from 'xmlbuilder2';


@Injectable()
export class SitemapService {

    constructor(private readonly noteService: NoteService) { }

    async getSitemap() {
        const finds = await this.noteService.findAll()

        const urls = finds.map((post) => ({
            loc: `https://localhost:3000/title/${post.title}`,
            lastmod: `${new Date()}`
        }));

        return this.generateSitemap(urls)
    }

    private generateSitemap(urls: { loc: string; lastmod?: string }[]): string {

        const root = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });


        urls.forEach((url) => {
            const urlElement = root.ele('url');
            urlElement.ele('loc').txt(url.loc);
            if (url.lastmod) {
                urlElement.ele('lastmod').txt(url.lastmod);
            }
        });

        return root.end({ prettyPrint: true });
    }
}
