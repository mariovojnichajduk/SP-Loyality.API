import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Shop } from '../shops/shop.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['favoriteShops'],
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async addFavoriteShop(userId: string, shopId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favoriteShops'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const shop = await this.shopsRepository.findOne({
      where: { id: shopId },
    });

    if (!shop) {
      throw new Error('Shop not found');
    }

    // Check if shop is already in favorites
    const isAlreadyFavorite = user.favoriteShops.some(
      (favShop) => favShop.id === shopId,
    );

    if (isAlreadyFavorite) {
      throw new Error('Shop is already in favorites');
    }

    user.favoriteShops.push(shop);
    await this.usersRepository.save(user);

    const updatedUser = await this.findById(userId);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }
    return updatedUser;
  }

  async removeFavoriteShop(userId: string, shopId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favoriteShops'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    user.favoriteShops = user.favoriteShops.filter(
      (shop) => shop.id !== shopId,
    );

    await this.usersRepository.save(user);

    const updatedUser = await this.findById(userId);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }
    return updatedUser;
  }

  async getFavoriteShops(userId: string): Promise<Shop[]> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.favoriteShops || [];
  }
}
