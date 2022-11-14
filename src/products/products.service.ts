import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cosmetics } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Cosmetics)
    private readonly productsRepository: Repository<Cosmetics>,
  ) {}

  async getAllProducts(): Promise<Cosmetics[]> {
    return await this.productsRepository.find();
  }

  async getProductsByType(type: string): Promise<Cosmetics[]> {
    return await (
      await this.productsRepository.find()
    ).filter((product) => product.product_type === type);
  }

  async getProductById(id: string): Promise<Cosmetics> {
    return await (
      await this.productsRepository.find()
    ).find((product) => product.id === +id);
  }
}
