import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RedeemRewardDto {
  @ApiProperty({
    description: 'The ID of the reward to redeem',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  rewardId: string;
}
