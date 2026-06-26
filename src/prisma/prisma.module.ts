import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Deixa o Prisma disponível na aplicação toda sem precisar importar de novo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <-- O ERRO PROVAVELMENTE ESTÁ AQUI. Adicione o exports!
})
export class PrismaModule {}