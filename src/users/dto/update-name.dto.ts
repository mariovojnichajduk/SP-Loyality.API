import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNameDto {
  @ApiProperty({
    description: 'New name for the user',
    example: 'John Smith',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
