import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

class RequestProductApprovalDto {
  @IsString()
  productName: string;

  @IsOptional()
  @IsUUID()
  shopId?: string;

  @IsOptional()
  @IsString()
  rawStoreName?: string;
}

class ApproveProductDto {
  @IsNumber()
  pointValue: number;

  @IsOptional()
  @IsUUID()
  shopId?: string;
}

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('request-approval')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Request approval for a product' })
  @ApiBody({ type: RequestProductApprovalDto })
  @ApiResponse({
    status: 201,
    description: 'Product approval requested successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async requestProductApproval(
    @Request() req,
    @Body(ValidationPipe) dto: RequestProductApprovalDto,
  ) {
    const userId = req.user.userId;
    const product = await this.productsService.requestProductApproval(
      userId,
      dto.productName,
      dto.shopId,
      dto.rawStoreName,
    );

    return {
      message: 'Product approval requested successfully',
      product: {
        id: product.id,
        name: product.name,
        isApproved: product.isApproved,
      },
    };
  }

  @Get('approval-status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Check approval request status for products' })
  @ApiResponse({
    status: 200,
    description: 'Approval request status for products',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getApprovalStatus(@Request() req) {
    const userId = req.user.userId;
    const approvalRequests = await this.productsService.getUserApprovalRequests(userId);

    // Return a map of productName -> hasRequested
    const statusMap: Record<string, boolean> = {};
    for (const request of approvalRequests) {
      if (request.product) {
        statusMap[request.product.name] = true;
      }
    }

    return { approvalStatus: statusMap };
  }

  @Get('unapproved')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all unapproved products (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of unapproved products',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getUnapprovedProducts() {
    const products = await this.productsService.findUnapprovedProducts();
    return { products };
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Approve a product and reward users (Admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: ApproveProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product approved successfully and users rewarded',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async approveProduct(
    @Param('id') productId: string,
    @Body(ValidationPipe) dto: ApproveProductDto,
  ) {
    const result = await this.productsService.approveProduct(
      productId,
      dto.pointValue,
      dto.shopId,
    );

    return {
      message: `Product approved successfully. ${result.rewardedUsers} user(s) rewarded with ${dto.pointValue} points`,
      product: {
        id: result.product.id,
        name: result.product.name,
        pointValue: result.product.pointValue,
        isApproved: result.product.isApproved,
        shopId: result.product.shopId,
      },
      rewardedUsers: result.rewardedUsers,
    };
  }
}
