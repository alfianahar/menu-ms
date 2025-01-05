import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from './menu.controller';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAllMenus(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async getMenusByDepth(depth: number): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: { depth },
    });
  }

  async getMenusByRootId(rootId: string): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: { root_id: rootId },
    });
  }

  async createMenu(data: Omit<Menu, 'id'>): Promise<Menu> {
    return this.prisma.menu.create({
      data,
    });
  }

  async updateMenu(id: string, data: Partial<Omit<Menu, 'id'>>): Promise<Menu> {
    try {
      return await this.prisma.menu.update({
        where: { id },
        data,
      });
    } catch (error) {
      // Handle case where menu with given id doesn't exist
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }

  async updateOrCreateMenu(id: string, menuData: Partial<Menu>): Promise<Menu> {
    const existingMenu = await this.prisma.menu.findFirst({
      where: { id },
    });

    if (existingMenu) {
      return this.prisma.menu.update({
        where: { id },
        data: {
          ...menuData,
          id: undefined, // Exclude id from update
        },
      });
    } else {
      return this.prisma.menu.create({
        data: {
          id,
          depth: menuData.depth ?? 0,
          name: menuData.name ?? '',
          parent_id: menuData.parent_id,
          parent_name: menuData.parent_name,
          root_id: menuData.root_id,
          root_name: menuData.root_name,
        },
      });
    }
  }

  async deleteMenu(id: string): Promise<void> {
    try {
      await this.prisma.menu.delete({
        where: { id },
      });
    } catch (error) {
      // Handle case where menu with given id doesn't exist
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }
}
