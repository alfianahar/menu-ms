import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

type Menu = {
  id: string;
  depth: number;
  parentData: string;
  name: string;
};

@Controller('get-all-menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getAllMenus(): Promise<Menu[]> {
    return this.menuService.getAllMenus();
  }
}
