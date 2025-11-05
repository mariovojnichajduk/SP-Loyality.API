import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const verificationCode = this.generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await this.usersService.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiry,
      isVerified: false,
    });

    await this.emailService.sendVerificationEmail(user.email, verificationCode);

    return {
      message: 'Registration successful. Please check your email for verification code.',
      email: user.email,
    };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (user.verificationCode !== code) {
      throw new BadRequestException('Invalid verification code');
    }

    if (new Date() > user.verificationCodeExpiry) {
      throw new BadRequestException('Verification code expired');
    }

    await this.usersService.update(user.id, {
      isVerified: true,
      verificationCode: undefined,
      verificationCodeExpiry: undefined,
    });

    return { message: 'Email verified successfully' };
  }

  async resendVerification(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    const verificationCode = this.generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.usersService.update(user.id, {
      verificationCode,
      verificationCodeExpiry,
    });

    await this.emailService.sendVerificationEmail(email, verificationCode);

    return {
      message: 'Verification code sent successfully. Please check your email.',
      email: user.email,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordResetCode = this.generateVerificationCode();
    const passwordResetCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.usersService.update(user.id, {
      passwordResetCode,
      passwordResetCodeExpiry,
    });

    await this.emailService.sendPasswordResetEmail(email, passwordResetCode);

    return {
      message: 'Password reset code sent successfully. Please check your email.',
      email: user.email,
    };
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.passwordResetCode) {
      throw new BadRequestException('No password reset request found');
    }

    if (user.passwordResetCode !== code) {
      throw new BadRequestException('Invalid reset code');
    }

    if (new Date() > user.passwordResetCodeExpiry) {
      throw new BadRequestException('Reset code expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.update(user.id, {
      password: hashedPassword,
      passwordResetCode: undefined,
      passwordResetCodeExpiry: undefined,
    });

    return { message: 'Password reset successfully' };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
