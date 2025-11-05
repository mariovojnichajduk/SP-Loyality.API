import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';

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
}
