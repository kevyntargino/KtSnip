import { AppService } from './app.service';
import type { Response } from 'express';
export declare class EncurtarUrlDto {
    urlOriginal: string;
    slug?: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    healthStatus(): Promise<{
        status: string;
        timestamp: string;
        message: string;
    }>;
    encolherUrl(body: EncurtarUrlDto): Promise<any>;
    redirect(slug: string, res: Response): Promise<void>;
}
