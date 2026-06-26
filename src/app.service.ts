import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}


  async encolherUrl(urlOriginal: string, slug?: string){

    const slugFinal = slug || randomStringGenerator().slice(0, 6);

    const slugExiste = await this.prisma.url.findUnique({
      where: {slug: slugFinal}
    })

    if (slugExiste){
      if (slug){
        throw new BadRequestException('Esse slug ja esta em uso')
      }
      return this.encolherUrl(urlOriginal);
    }

    const urlShort = `http://localhost:3000/${slugFinal}`;

    return this.prisma.url.create({
        data: {
          urlOriginal,
          urlShort,
          slug: slugFinal,
        }
    });
  }

  async getUrlOriginal(slug: string){
    const urlOriginal = await this.prisma.prismaServiceUrl.findUnique({
      where: {slug}
    })

    if (!urlOriginal){
      throw new NotFoundException('Url original nao encontrada');
    }

    return urlOriginal;
  }
}
