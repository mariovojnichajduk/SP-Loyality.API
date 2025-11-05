import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteShopDto {
  @ApiProperty({
    description: 'UUID of the shop to add/remove from favorites',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  shopId: string;
}
