import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Inicializa o Adapter oficial apontando para o arquivo físico do SQLite
    // No construtor da sua classe PrismaService:
  const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });;
    
    // 2. Injeta o Adapter diretamente na classe pai (PrismaClient)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}