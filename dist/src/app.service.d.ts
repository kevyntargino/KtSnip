import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    encolherUrl(urlOriginal: string, slug?: string): any;
    getUrlOriginal(slug: string): Promise<{
        id: string;
        slug: string;
        urlOriginal: string;
        urlShort: string;
        createdAt: Date;
    }>;
}
