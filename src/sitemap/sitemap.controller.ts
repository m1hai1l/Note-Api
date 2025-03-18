import { Controller, Get, Header } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Карты сайта')
@Controller()
export class SitemapController {

    constructor(private readonly sitemapService: SitemapService) { }

    @Get('sitemap.xml')
    @ApiResponse({ status: 200, description: "sitemap.xml" })
    @ApiOperation({ summary: 'Получить XML карты сайта', description: 'Возвращает карту сайта в формате XML.' })
    @ApiHeader({ name: 'Content-Type', description: 'Должен быть установлен как application/xml' })
    @Header('Content-Type', 'application/xml')
    async sitemap() {
        return await this.sitemapService.getSitemap()
    }

}
