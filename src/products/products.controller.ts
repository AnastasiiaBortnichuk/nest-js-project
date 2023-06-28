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
import { Products } from './products.entity';
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
  public async getAllProducts(): Promise<Products[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':type')
  public async getProductsByType(
    @Param('type') type: string,
  ): Promise<Products[]> {
    return await this.productsService.getProductsByType(type);
  }

  @Get('product/:id')
  public async getProductById(
    @Param('id') id: number,
    @Query('product') product: string,
  ): Promise<Products> {
    return await this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @UseGuards(RoleGuard(Role.User))
  public async addProduct(
    @Body() product: CreateProductDto,
  ): Promise<Products> {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  @UseGuards(RoleGuard(Role.User))
  public async updateProduct(
    @Param('id') id: number,
    @Body() product: CreateProductDto,
  ): Promise<Products> {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  public async deleteProduct(@Param('id') id: number): Promise<Products> {
    return this.productsService.deleteProduct(id);
  }
}
