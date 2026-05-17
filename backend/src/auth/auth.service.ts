import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { email: string; password: string }) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: data.email },
    });

    if (existingAdmin) {
      throw new BadRequestException('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      message: 'Admin registered successfully',
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }

  async login(data: { email: string; password: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: data.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(data.password, admin.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.jwtService.signAsync({
      sub: admin.id,
      email: admin.email,
    });

    return {
      message: 'Login successful',
      accessToken: token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }
}