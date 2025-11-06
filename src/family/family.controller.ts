import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FamilyService } from './family.service';

@Controller('api/family')
@UseGuards(JwtAuthGuard)
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get('invitation-code')
  async getInvitationCode(@Request() req) {
    const code = await this.familyService.getInvitationCode(req.user.userId);
    return { invitationCode: code };
  }

  @Post('join')
  async joinFamily(@Request() req, @Body() body: { invitationCode: string }) {
    await this.familyService.joinFamily(req.user.userId, body.invitationCode);
    return { message: 'Successfully joined family' };
  }

  @Get('members')
  async getFamilyMembers(@Request() req) {
    const members = await this.familyService.getFamilyMembers(req.user.userId);
    return members.map((member) => ({
      id: member.id,
      name: member.name,
      email: member.email,
      points: member.points,
    }));
  }

  @Delete('members/:memberId')
  async removeFamilyMember(@Request() req, @Param('memberId') memberId: string) {
    await this.familyService.removeFamilyMember(req.user.userId, memberId);
    return { message: 'Family member removed successfully' };
  }
}
