import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Cosmetics } from './products.entity';
import { ProductsService } from './products.service';
import Role from '../users/role/role.enum';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import RoleGuard from '../users/role/role.guard';
import CreateProductDto from './dto/createProduct.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
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

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async addProduct(@Body() product: CreateProductDto) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: CreateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  async deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
