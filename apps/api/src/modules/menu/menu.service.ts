import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAllMenus() {
    return this.prisma.menu.findMany();
  }

  async createMenu(data: { name: string; depth: number; parentData: string }) {
    return this.prisma.menu.create({
      data,
    });
  }
}
