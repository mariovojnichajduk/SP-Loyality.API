import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { FavoriteShopDto } from './dto/favorite-shop.dto';
import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@ApiTags('user')
@Controller('api/user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile data',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'user@example.com',
        name: 'John Doe',
        points: 150,
        favoriteShops: [
          {
            id: 'shop-uuid',
            name: 'Shop Name',
            location: 'Shop Location',
          },
        ],
        createdAt: '2025-11-05T09:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProfile(@Request() req) {
    const userId = req.user.userId;
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      points: user.points,
      favoriteShops: user.favoriteShops || [],
      createdAt: user.createdAt,
    };
  }

  @Patch('me/password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    schema: {
      example: {
        message: 'Password changed successfully',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Current password is incorrect',
  })
  async changePassword(
    @Request() req,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user.userId;
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.usersService.update(userId, { password: hashedPassword });

    return {
      message: 'Password changed successfully',
    };
  }

  @Patch('me/name')
  @ApiOperation({ summary: 'Update user name' })
  @ApiBody({ type: UpdateNameDto })
  @ApiResponse({
    status: 200,
    description: 'Name updated successfully',
    schema: {
      example: {
        message: 'Name updated successfully',
        name: 'John Smith',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateName(
    @Request() req,
    @Body(ValidationPipe) updateNameDto: UpdateNameDto,
  ) {
    const userId = req.user.userId;
    await this.usersService.update(userId, { name: updateNameDto.name });

    return {
      message: 'Name updated successfully',
      name: updateNameDto.name,
    };
  }

  @Delete('me')
  @ApiOperation({ summary: 'Deactivate user account' })
  @ApiResponse({
    status: 200,
    description: 'Account deactivated successfully',
    schema: {
      example: {
        message: 'Account deactivated successfully',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deactivateAccount(@Request() req) {
    const userId = req.user.userId;

    // For now, we'll just mark the user as not verified to "deactivate"
    // You can add an "isActive" field later for better control
    await this.usersService.update(userId, { isVerified: false });

    return {
      message: 'Account deactivated successfully',
    };
  }

  @Get('me/favorite-shops')
  @ApiOperation({ summary: 'Get user favorite shops' })
  @ApiResponse({
    status: 200,
    description: 'List of favorite shops',
    schema: {
      example: [
        {
          id: 'shop-uuid',
          name: 'Shop Name',
          location: 'Shop Location',
          createdAt: '2025-11-05T09:00:00.000Z',
        },
      ],
    },
  })
  async getFavoriteShops(@Request() req) {
    const userId = req.user.userId;
    return this.usersService.getFavoriteShops(userId);
  }

  @Post('me/favorite-shops')
  @ApiOperation({ summary: 'Add a shop to favorites' })
  @ApiBody({ type: FavoriteShopDto })
  @ApiResponse({
    status: 201,
    description: 'Shop added to favorites',
    schema: {
      example: {
        message: 'Shop added to favorites',
        favoriteShops: [
          {
            id: 'shop-uuid',
            name: 'Shop Name',
            location: 'Shop Location',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Shop already in favorites or not found',
  })
  async addFavoriteShop(
    @Request() req,
    @Body(ValidationPipe) favoriteShopDto: FavoriteShopDto,
  ) {
    const userId = req.user.userId;
    try {
      const user = await this.usersService.addFavoriteShop(
        userId,
        favoriteShopDto.shopId,
      );
      return {
        message: 'Shop added to favorites',
        favoriteShops: user.favoriteShops,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('me/favorite-shops/:shopId')
  @ApiOperation({ summary: 'Remove a shop from favorites' })
  @ApiResponse({
    status: 200,
    description: 'Shop removed from favorites',
    schema: {
      example: {
        message: 'Shop removed from favorites',
        favoriteShops: [],
      },
    },
  })
  async removeFavoriteShop(@Request() req, @Param('shopId') shopId: string) {
    const userId = req.user.userId;
    try {
      const user = await this.usersService.removeFavoriteShop(userId, shopId);
      return {
        message: 'Shop removed from favorites',
        favoriteShops: user.favoriteShops,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('update-invitation-codes')
  @ApiOperation({ summary: 'Update users without invitation codes (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Invitation codes updated',
    schema: {
      example: {
        message: 'Updated invitation codes for users',
        updated: 5,
      },
    },
  })
  async updateInvitationCodes() {
    const result = await this.usersService.updateUsersWithoutInvitationCodes();
    return {
      message: 'Updated invitation codes for users',
      updated: result.updated,
    };
  }
}
