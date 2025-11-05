import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PointsService } from './points.service';

@ApiTags('points')
@Controller('api/points')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PointsController {
  constructor(private pointsService: PointsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user points' })
  @ApiResponse({
    status: 200,
    description: 'Returns user points',
    schema: {
      example: {
        points: 150,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async getUserPoints(@Request() req) {
    const userId = req.user.userId;
    return this.pointsService.getUserPoints(userId);
  }
}
