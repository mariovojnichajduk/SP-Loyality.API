import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalRequest, ApprovalStatus } from './approval-request.entity';

@Injectable()
export class ApprovalRequestsService {
  constructor(
    @InjectRepository(ApprovalRequest)
    private approvalRequestsRepository: Repository<ApprovalRequest>,
  ) {}

  async findAll(): Promise<ApprovalRequest[]> {
    return this.approvalRequestsRepository.find({
      relations: ['user', 'product', 'product.shop'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<ApprovalRequest | null> {
    return this.approvalRequestsRepository.findOne({
      where: { id },
      relations: ['user', 'product', 'product.shop'],
    });
  }

  async findByUserId(userId: string): Promise<ApprovalRequest[]> {
    return this.approvalRequestsRepository.find({
      where: { userId },
      relations: ['product', 'product.shop'],
      order: { createdAt: 'DESC' },
    });
  }

  async findPendingRequests(): Promise<ApprovalRequest[]> {
    return this.approvalRequestsRepository.find({
      where: { status: ApprovalStatus.PENDING },
      relations: ['user', 'product', 'product.shop'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(
    approvalRequestData: Partial<ApprovalRequest>,
  ): Promise<ApprovalRequest> {
    const approvalRequest =
      this.approvalRequestsRepository.create(approvalRequestData);
    return this.approvalRequestsRepository.save(approvalRequest);
  }

  async updateStatus(
    id: string,
    status: ApprovalStatus,
    adminNotes?: string,
  ): Promise<ApprovalRequest> {
    await this.approvalRequestsRepository.update(id, {
      status,
      adminNotes,
    });
    const updatedRequest = await this.findById(id);
    if (!updatedRequest) {
      throw new Error(`Approval request with id ${id} not found`);
    }
    return updatedRequest;
  }

  async delete(id: string): Promise<void> {
    await this.approvalRequestsRepository.delete(id);
  }
}
