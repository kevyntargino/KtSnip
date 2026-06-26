import { AppService } from './app.service';
import type { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    HealthStatus(): Promise<{
        status: string;
        timestamp: string;
        message: string;
    }>;
    encolherUrl(body: {
        urlOriginal: string;
        slug?: string;
    }): Promise<any>;
    redirect(slug: string, res: Response): Promise<void>;
}
