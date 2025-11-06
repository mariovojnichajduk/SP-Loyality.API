import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { User } from '../users/user.entity';
import { Transaction } from '../transactions/transaction.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
  ) {}

  async findAll(): Promise<Shop[]> {
    return this.shopsRepository.find({ relations: ['products'] });
  }

  async findById(id: string): Promise<Shop | null> {
    return this.shopsRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async findByName(name: string): Promise<Shop | null> {
    return this.shopsRepository.findOne({
      where: { name },
    });
  }

  async create(shopData: Partial<Shop>): Promise<Shop> {
    const shop = this.shopsRepository.create(shopData);
    return this.shopsRepository.save(shop);
  }

  async update(id: string, shopData: Partial<Shop>): Promise<Shop> {
    await this.shopsRepository.update(id, shopData);
    const updatedShop = await this.findById(id);
    if (!updatedShop) {
      throw new Error(`Shop with id ${id} not found`);
    }
    return updatedShop;
  }

  async delete(id: string): Promise<void> {
    await this.shopsRepository.delete(id);
  }

  async getAllShopsWithStats(userId: string) {
    // Get user's favorite shops
    const user = await User.findOne({
      where: { id: userId },
      relations: ['favoriteShops'],
    });
    const favoriteShopIds = user?.favoriteShops?.map((shop) => shop.id) || [];

    // Get all shops with transaction stats
    const shopsWithStats = await this.shopsRepository
      .createQueryBuilder('shop')
      .leftJoin('shop.transactions', 'transaction')
      .select([
        'shop.id',
        'shop.name',
        'shop.cleanedName',
        'shop.location',
        'shop.additionalPoints',
        'shop.createdAt',
      ])
      .addSelect('COUNT(DISTINCT transaction.id)', 'transactionCount')
      .addSelect('COALESCE(SUM(transaction.points), 0)', 'totalPoints')
      .groupBy('shop.id')
      .addGroupBy('shop.name')
      .addGroupBy('shop.cleanedName')
      .addGroupBy('shop.location')
      .addGroupBy('shop.additionalPoints')
      .addGroupBy('shop.createdAt')
      .orderBy('COUNT(DISTINCT transaction.id)', 'DESC')
      .getRawMany();

    // Get top 3 performers
    const top3ShopIds = shopsWithStats.slice(0, 3).map((shop) => shop.shop_id);

    // Format and sort shops
    const formattedShops = shopsWithStats.map((shop) => ({
      id: shop.shop_id,
      name: shop.shop_cleanedName || shop.shop_name,
      location: shop.shop_location,
      transactionCount: parseInt(shop.transactionCount) || 0,
      totalPoints: parseInt(shop.totalPoints) || 0,
      additionalPoints: parseInt(shop.shop_additionalPoints) || 0,
      hasPromotion: (parseInt(shop.shop_additionalPoints) || 0) > 0,
      isFavorite: favoriteShopIds.includes(shop.shop_id),
      isTopPerformer: top3ShopIds.includes(shop.shop_id),
      rank: top3ShopIds.indexOf(shop.shop_id) + 1 || null,
    }));

    // Sort: Favorites first, then top 3, then promotions, then rest by name
    formattedShops.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      if (a.isTopPerformer && !b.isTopPerformer) return -1;
      if (!a.isTopPerformer && b.isTopPerformer) return 1;
      if (a.isTopPerformer && b.isTopPerformer) {
        return (a.rank || 999) - (b.rank || 999);
      }
      if (a.hasPromotion && !b.hasPromotion) return -1;
      if (!a.hasPromotion && b.hasPromotion) return 1;
      return a.name.localeCompare(b.name);
    });

    return formattedShops;
  }

  async getFavoriteShops(userId: string) {
    const user = await User.findOne({
      where: { id: userId },
      relations: ['favoriteShops'],
    });
    return user?.favoriteShops || [];
  }

  async addFavorite(userId: string, shopId: string) {
    const user = await User.findOne({
      where: { id: userId },
      relations: ['favoriteShops'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const shop = await this.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }

    if (!user.favoriteShops) {
      user.favoriteShops = [];
    }

    // Check if already favorited
    if (user.favoriteShops.some((s) => s.id === shopId)) {
      return { message: 'Shop already in favorites' };
    }

    user.favoriteShops.push(shop);
    await user.save();

    return { message: 'Shop added to favorites' };
  }

  async removeFavorite(userId: string, shopId: string) {
    const user = await User.findOne({
      where: { id: userId },
      relations: ['favoriteShops'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    user.favoriteShops = user.favoriteShops.filter((shop) => shop.id !== shopId);
    await user.save();

    return { message: 'Shop removed from favorites' };
  }
}
