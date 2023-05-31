import { Controller, Get, Param, Query } from '@nestjs/common';
import { Cosmetics } from './products.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getAllProducts(): Promise<Cosmetics[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':type')
  async getProductsByType(@Param('type') type: string): Promise<Cosmetics[]> {
    return await this.productsService.getProductsByType(type);
  }

  @Get('product/:id')
  async getProductById(
    @Param('id') id: string,
    @Query('product') product: string,
  ): Promise<Cosmetics> {
    return await this.productsService.getProductById(id);
  }
}
