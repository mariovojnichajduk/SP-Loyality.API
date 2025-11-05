import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApprovalStatus } from '../approval-request.entity';

export class UpdateApprovalStatusDto {
  @ApiProperty({
    description: 'Approval status',
    enum: ApprovalStatus,
    example: ApprovalStatus.APPROVED,
  })
  @IsEnum(ApprovalStatus)
  status: ApprovalStatus;

  @ApiProperty({
    description: 'Optional admin notes/comments',
    example: 'Verified receipt matches product',
    required: false,
  })
  @IsOptional()
  @IsString()
  adminNotes?: string;
}
