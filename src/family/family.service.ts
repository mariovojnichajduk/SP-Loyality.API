import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async generateInvitationCode(userId: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Generate a unique 8-character invitation code
    let invitationCode = '';
    let isUnique = false;

    while (!isUnique) {
      invitationCode = crypto.randomBytes(4).toString('hex').toUpperCase();
      const existingUser = await this.usersRepository.findOne({
        where: { invitationCode },
      });
      isUnique = !existingUser;
    }

    user.invitationCode = invitationCode;
    await user.save();

    return invitationCode;
  }

  async getInvitationCode(userId: string): Promise<string | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['invitationCode'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Generate code if user doesn't have one
    if (!user.invitationCode) {
      return await this.generateInvitationCode(userId);
    }

    return user.invitationCode;
  }

  async joinFamily(userId: string, invitationCode: string): Promise<void> {
    // Find the user who owns the invitation code
    const inviter = await this.usersRepository.findOne({
      where: { invitationCode },
      relations: ['familyMembers'],
    });

    if (!inviter) {
      throw new HttpException(
        'Invalid invitation code',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Can't add yourself
    if (inviter.id === userId) {
      throw new HttpException(
        'You cannot add yourself as a family member',
        HttpStatus.BAD_REQUEST,
      );
    }

    const joiningUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['familyMembers'],
    });

    if (!joiningUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Check if already family members
    const alreadyMember = inviter.familyMembers?.some(
      (member) => member.id === userId,
    );
    const alreadyInviterMember = joiningUser.familyMembers?.some(
      (member) => member.id === inviter.id,
    );

    if (alreadyMember || alreadyInviterMember) {
      throw new HttpException(
        'You are already family members',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Add bidirectional family relationship
    if (!inviter.familyMembers) {
      inviter.familyMembers = [];
    }
    if (!joiningUser.familyMembers) {
      joiningUser.familyMembers = [];
    }

    inviter.familyMembers.push(joiningUser);
    joiningUser.familyMembers.push(inviter);

    await inviter.save();
    await joiningUser.save();
  }

  async getFamilyMembers(userId: string): Promise<User[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['familyMembers'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.familyMembers || [];
  }

  async removeFamilyMember(
    userId: string,
    familyMemberId: string,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['familyMembers'],
    });

    const familyMember = await this.usersRepository.findOne({
      where: { id: familyMemberId },
      relations: ['familyMembers'],
    });

    if (!user || !familyMember) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Remove bidirectional relationship
    user.familyMembers = user.familyMembers.filter(
      (member) => member.id !== familyMemberId,
    );
    familyMember.familyMembers = familyMember.familyMembers.filter(
      (member) => member.id !== userId,
    );

    await user.save();
    await familyMember.save();
  }
}
