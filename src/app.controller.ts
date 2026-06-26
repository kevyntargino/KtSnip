import { Controller, Get, Post, Param, Res, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';

// 1. Criamos o DTO. É essa classe com o @ApiProperty que faz os campos aparecerem no Swagger!
export class EncurtarUrlDto {
  @ApiProperty({
    description: 'A URL original longa que você deseja encurtar',
    example: 'https://github.com/kevyntargino',
    required: true,
  })
  urlOriginal: string;

  @ApiProperty({
    description: 'Um código personalizado opcional para o link curto',
    example: 'meu-perfil',
    required: false, // Indica que este campo não é obrigatório
  })
  slug?: string;
}

@ApiTags('Encurtador de URLs')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Verifica a saúde da API' })
  @ApiResponse({ status: 200, description: 'API online.' })
  async healthStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'A API KtSnip está online e operante!'
    };
  }

  @Post('snip')
  @ApiOperation({ summary: 'Encurta uma URL original' })
  @ApiResponse({ status: 201, description: 'URL encurtada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Slug já em uso.' })
  // 2. Substituímos o objeto inline pela nossa classe DTO
  async encolherUrl(@Body() body: EncurtarUrlDto) {
    return this.appService.encolherUrl(body.urlOriginal, body.slug);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Redireciona para a URL original' })
  @ApiParam({ name: 'slug', description: 'O código identificador da URL curta', example: 'meu-perfil' })
  @ApiResponse({ status: 302, description: 'Redirecionamento executado.' })
  @ApiResponse({ status: 404, description: 'Slug não encontrado.' })
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const urlRecord = await this.appService.getUrlOriginal(slug);

    return res.redirect(HttpStatus.FOUND, urlRecord.urlOriginal);  
  }
}