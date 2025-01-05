import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Prisma } from '@prisma/client';

export type Menu = {
  id: string;
  depth: number;
  name: string;
  parent_id: string;
  parent_name: string;
  root_id: string;
  root_name: string;
};

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getAllMenus(): Promise<Menu[]> {
    return this.menuService.getAllMenus();
  }

  @Get('root')
  getRootMenus(): Promise<Menu[]> {
    return this.menuService.getMenusByDepth(0);
  }

  @Get('by-root')
  getMenusByRootId(@Query('rootId') rootId: string): Promise<Menu[]> {
    return this.menuService.getMenusByRootId(rootId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMenu(@Body() menuData: Omit<Menu, 'id'>): Promise<Menu> {
    return this.menuService.createMenu(menuData);
  }

  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // updateMenu(
  //   @Param('id') id: string,
  //   @Body() menuData: Partial<Omit<Menu, 'id'>>,
  // ): Promise<Menu> {
  //   return this.menuService.updateMenu(id, menuData);
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOrCreateMenu(
    @Param('id') id: string,
    @Body() menuData: Partial<Omit<Menu, 'id'>> & { id?: string },
  ): Promise<Menu> {
    try {
      return await this.menuService.updateOrCreateMenu(id, menuData);
    } catch (error) {
      // Handle specific Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle unique constraint violations or other known errors
        throw new ConflictException('Unable to create or update menu');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMenu(@Param('id') id: string): Promise<void> {
    return this.menuService.deleteMenu(id);
  }
}
