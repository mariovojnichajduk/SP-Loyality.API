import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['shop'] });
  }

  async findById(id: string): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['shop'],
    });
  }

  async findByShopId(shopId: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: { shopId },
      relations: ['shop'],
    });
  }

  async findAvailableProducts(): Promise<Product[]> {
    return this.productsRepository.find({
      where: { status: ProductStatus.AVAILABLE },
      relations: ['shop'],
    });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    await this.productsRepository.update(id, productData);
    const updatedProduct = await this.findById(id);
    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found`);
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async existsByName(productName: string): Promise<boolean> {
    const count = await this.productsRepository.count({
      where: { name: productName },
    });
    return count > 0;
  }

  async findByName(productName: string): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { name: productName },
    });
  }
}
