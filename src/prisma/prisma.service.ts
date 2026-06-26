import { Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Executado quando o módulo inicializa (conecta ao banco)
  async onModuleInit() {
    await this.$connect();
  }

  // Executado quando o módulo é destruído (desconecta do banco com segurança)
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
