import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessReceiptDto {
  @ApiProperty({
    description: 'The Serbian fiscal receipt verification URL from suf.purs.gov.rs',
    example: 'https://suf.purs.gov.rs/v/?vl=A000WEc3V0NTTTRYRzdXQ1M6...',
  })
  @IsString()
  @IsUrl()
  receiptUrl: string;
}
