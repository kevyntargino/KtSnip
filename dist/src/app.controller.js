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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.EncurtarUrlDto = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const swagger_1 = require("@nestjs/swagger");
class EncurtarUrlDto {
    urlOriginal;
    slug;
}
exports.EncurtarUrlDto = EncurtarUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A URL original longa que você deseja encurtar',
        example: 'https://github.com/kevyntargino',
        required: true,
    }),
    __metadata("design:type", String)
], EncurtarUrlDto.prototype, "urlOriginal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Um código personalizado opcional para o link curto',
        example: 'meu-perfil',
        required: false,
    }),
    __metadata("design:type", String)
], EncurtarUrlDto.prototype, "slug", void 0);
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    async healthStatus() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            message: 'A API KtSnip está online e operante!'
        };
    }
    async encolherUrl(body) {
        return this.appService.encolherUrl(body.urlOriginal, body.slug);
    }
    async redirect(slug, res) {
        const urlRecord = await this.appService.getUrlOriginal(slug);
        return res.redirect(common_1.HttpStatus.FOUND, urlRecord.urlOriginal);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica a saúde da API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'API online.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "healthStatus", null);
__decorate([
    (0, common_1.Post)('snip'),
    (0, swagger_1.ApiOperation)({ summary: 'Encurta uma URL original' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'URL encurtada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Slug já em uso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EncurtarUrlDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "encolherUrl", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Redireciona para a URL original' }),
    (0, swagger_1.ApiParam)({ name: 'slug', description: 'O código identificador da URL curta', example: 'meu-perfil' }),
    (0, swagger_1.ApiResponse)({ status: 302, description: 'Redirecionamento executado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Slug não encontrado.' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "redirect", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Encurtador de URLs'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map