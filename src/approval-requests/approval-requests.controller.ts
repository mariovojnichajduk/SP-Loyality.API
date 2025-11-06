import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApprovalRequestsService } from './approval-requests.service';
import { CreateApprovalRequestDto } from './dto/create-approval-request.dto';
import { UpdateApprovalStatusDto } from './dto/update-approval-status.dto';
import { ApprovalStatus } from './approval-request.entity';
import { User, UserRole } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ApiTags('approval-requests')
@ApiBearerAuth('JWT-auth')
@Controller('approval-requests')
@UseGuards(JwtAuthGuard)
export class ApprovalRequestsController {
  constructor(
    private readonly approvalRequestsService: ApprovalRequestsService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // User: Create approval request
  @Post()
  @ApiOperation({ summary: 'Create a new approval request for a product' })
  @ApiResponse({ status: 201, description: 'Approval request created successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async create(@Request() req, @Body() createDto: CreateApprovalRequestDto) {
    const userId = req.user.userId;

    // Verify product exists
    const product = await this.productsRepository.findOne({
      where: { id: createDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const approvalRequest = await this.approvalRequestsService.create({
      userId,
      productId: createDto.productId,
      status: ApprovalStatus.PENDING,
    });

    return this.approvalRequestsService.findById(approvalRequest.id);
  }

  // User: Get their own approval requests
  @Get('my-requests')
  @ApiOperation({ summary: 'Get all approval requests for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of user approval requests' })
  async getMyRequests(@Request() req) {
    const userId = req.user.userId;
    return this.approvalRequestsService.findByUserId(userId);
  }

  // Admin: Get all approval requests
  @Get()
  @ApiOperation({ summary: '[Admin] Get all approval requests from all users' })
  @ApiResponse({ status: 200, description: 'List of all approval requests' })
  @ApiResponse({ status: 400, description: 'Only admins can view all requests' })
  async findAll(@Request() req) {
    const user = await this.usersRepository.findOne({
      where: { id: req.user.userId },
    });

    if (user?.role !== UserRole.ADMIN) {
      throw new BadRequestException('Only admins can view all requests');
    }

    return this.approvalRequestsService.findAll();
  }

  // Admin: Get pending approval requests
  @Get('pending')
  @ApiOperation({ summary: '[Admin] Get all pending approval requests' })
  @ApiResponse({ status: 200, description: 'List of pending approval requests' })
  @ApiResponse({ status: 400, description: 'Only admins can view pending requests' })
  async getPendingRequests(@Request() req) {
    const user = await this.usersRepository.findOne({
      where: { id: req.user.userId },
    });

    if (user?.role !== UserRole.ADMIN) {
      throw new BadRequestException('Only admins can view pending requests');
    }

    return this.approvalRequestsService.findPendingRequests();
  }

  // Admin: Approve or reject a request
  @Patch(':id/status')
  @ApiOperation({ summary: '[Admin] Approve or reject an approval request' })
  @ApiResponse({ status: 200, description: 'Request status updated, points awarded if approved' })
  @ApiResponse({ status: 400, description: 'Only admins can update status or request already processed' })
  @ApiResponse({ status: 404, description: 'Approval request not found' })
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateApprovalStatusDto,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id: req.user.userId },
    });

    if (user?.role !== UserRole.ADMIN) {
      throw new BadRequestException('Only admins can update request status');
    }

    const approvalRequest = await this.approvalRequestsService.findById(id);

    if (!approvalRequest) {
      throw new NotFoundException('Approval request not found');
    }

    if (approvalRequest.status !== ApprovalStatus.PENDING) {
      throw new BadRequestException(
        'Can only update status of pending requests',
      );
    }

    // Note: This approval system is unused. Points are awarded through the TransactionProduct system.
    // If this endpoint is ever used in the future, points should be awarded via receipts/transactions,
    // not directly here.

    return this.approvalRequestsService.updateStatus(
      id,
      updateDto.status,
      updateDto.adminNotes,
    );
  }

  // Get a specific approval request
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific approval request by ID' })
  @ApiResponse({ status: 200, description: 'Approval request details' })
  @ApiResponse({ status: 400, description: 'Access denied - can only view own requests' })
  @ApiResponse({ status: 404, description: 'Approval request not found' })
  async findOne(@Request() req, @Param('id') id: string) {
    const approvalRequest = await this.approvalRequestsService.findById(id);

    if (!approvalRequest) {
      throw new NotFoundException('Approval request not found');
    }

    const user = await this.usersRepository.findOne({
      where: { id: req.user.userId },
    });

    // Users can only see their own requests, admins can see all
    if (
      user?.role !== UserRole.ADMIN &&
      approvalRequest.userId !== req.user.userId
    ) {
      throw new BadRequestException('Access denied');
    }

    return approvalRequest;
  }
}
