import { Controller, Get } from '@nestjs/common';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getAllProducts(): Promise<Products[]> {
    return await this.productsService.getAllProducts();
  }
}
