import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ShopsService } from './shops.service';

@Controller('api/shops')
@UseGuards(JwtAuthGuard)
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  async getAllShops(@Request() req) {
    return this.shopsService.getAllShopsWithStats(req.user.userId);
  }

  @Get('favorites')
  async getFavoriteShops(@Request() req) {
    return this.shopsService.getFavoriteShops(req.user.userId);
  }

  @Post('favorites/:shopId')
  async addFavorite(@Request() req, @Param('shopId') shopId: string) {
    return this.shopsService.addFavorite(req.user.userId, shopId);
  }

  @Delete('favorites/:shopId')
  async removeFavorite(@Request() req, @Param('shopId') shopId: string) {
    return this.shopsService.removeFavorite(req.user.userId, shopId);
  }
}
