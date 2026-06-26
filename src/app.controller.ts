import { Controller, Get, Post, Param, Res, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async HealthStatus(){
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'A API KtSnip está online e operante!'
    };
  }

  @Post('snip')
  async encolherUrl(@Body() body: {urlOriginal: string, slug?: string}){
    return this.appService.encolherUrl(body.urlOriginal, body.slug);
  }

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const urlRecord = await this.appService.getUrlOriginal(slug);

  return res.redirect(HttpStatus.FOUND, urlRecord.urlOriginal);  
  }
}
