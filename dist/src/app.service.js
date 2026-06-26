"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const prisma_service_1 = require("./prisma/prisma.service");
let AppService = class AppService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    logger = new common_1.Logger();
    async encolherUrl(urlOriginal, slug) {
        const slugFinal = slug || (0, random_string_generator_util_1.randomStringGenerator)().slice(0, 6);
        this.logger.log(`O slug é ${slug}`);
        const slugExiste = await this.prisma.url.findUnique({
            where: { slug: slugFinal }
        });
        if (slugExiste) {
            if (slug) {
                throw new common_1.BadRequestException('Esse slug ja esta em uso');
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
    async getUrlOriginal(slug) {
        const urlOriginal = await this.prisma.url.findUnique({
            where: { slug }
        });
        if (!urlOriginal) {
            throw new common_1.NotFoundException('Url original nao encontrada');
        }
        return urlOriginal;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map