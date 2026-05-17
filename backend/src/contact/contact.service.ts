import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  createMessage(data: { name: string; email: string; message: string }) {
    return this.prisma.contactMessage.create({
      data,
    });
  }

  getAllMessages() {
    return this.prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}