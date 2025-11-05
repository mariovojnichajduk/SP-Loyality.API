import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';
import { ProductApprovalRequest } from './product-approval-request.entity';
import { UsersService } from '../users/users.service';
import { ShopsService } from '../shops/shops.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductApprovalRequest)
    private approvalRequestsRepository: Repository<ProductApprovalRequest>,
    private usersService: UsersService,
    private shopsService: ShopsService,
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

  async requestProductApproval(
    userId: string,
    productName: string,
    shopId?: string,
    rawStoreName?: string,
  ): Promise<Product> {
    // Check if product already exists
    let product = await this.findByName(productName);

    // Try to find shop by rawStoreName if shopId is not provided
    let resolvedShopId = shopId;
    if (!resolvedShopId && rawStoreName) {
      const shop = await this.shopsService.findByName(rawStoreName);
      if (shop) {
        resolvedShopId = shop.id;
      }
    }

    if (!product) {
      // Create the product with 0 points and isApproved = false
      product = this.productsRepository.create({
        name: productName,
        pointValue: 0,
        isApproved: false,
        shopId: resolvedShopId || null,
        status: ProductStatus.UNAVAILABLE,
      });
      product = await this.productsRepository.save(product);
    }

    // Check if user already requested approval for this product
    const existingRequest = await this.approvalRequestsRepository.findOne({
      where: { userId, productId: product.id },
    });

    if (!existingRequest) {
      // Create approval request
      const approvalRequest = this.approvalRequestsRepository.create({
        userId,
        productId: product.id,
        isRewarded: false,
      });
      await this.approvalRequestsRepository.save(approvalRequest);
    }

    return product;
  }

  async findUnapprovedProducts(): Promise<Product[]> {
    return this.productsRepository.find({
      where: { isApproved: false },
      relations: ['shop'],
    });
  }

  async approveProduct(
    productId: string,
    pointValue: number,
    shopId?: string,
  ): Promise<{ product: Product; rewardedUsers: number }> {
    // Update product
    const updateData: Partial<Product> = {
      pointValue,
      isApproved: true,
      status: ProductStatus.AVAILABLE,
    };

    // Only update shopId if provided
    if (shopId) {
      updateData.shopId = shopId;
    }

    await this.productsRepository.update(productId, updateData);

    const product = await this.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    // Find all users who requested this product
    const approvalRequests = await this.approvalRequestsRepository.find({
      where: { productId, isRewarded: false },
      relations: ['user'],
    });

    // Reward users with points and mark requests as rewarded
    for (const request of approvalRequests) {
      await this.usersService.addPoints(request.userId, pointValue);
      request.isRewarded = true;
      await this.approvalRequestsRepository.save(request);
    }

    return {
      product,
      rewardedUsers: approvalRequests.length,
    };
  }

  async getApprovalRequestsByProduct(
    productId: string,
  ): Promise<ProductApprovalRequest[]> {
    return this.approvalRequestsRepository.find({
      where: { productId, isRewarded: false },
      relations: ['user'],
    });
  }

  async getUserApprovalRequests(
    userId: string,
  ): Promise<ProductApprovalRequest[]> {
    return this.approvalRequestsRepository.find({
      where: { userId },
      relations: ['product'],
    });
  }
}
