import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import CreateProductDto from './dto/createProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async getAllProducts(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async getProductsByType(type: string): Promise<Products[]> {
    return await this.productsRepository.find({
      where: { product_type: type },
    });
  }

  async getProductById(id: number): Promise<Products> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async addProduct(product: CreateProductDto): Promise<Products> {
    const newProduct = await this.productsRepository.create(product);
    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async updateProduct(
    id: number,
    product: CreateProductDto,
  ): Promise<Products> {
    const productToUpdate = await this.productsRepository.findOne({
      where: { id },
    });

    if (productToUpdate) {
      await this.productsRepository.update(id, product);

      const updatedProduct = await this.productsRepository.findOne({
        where: { id },
      });

      return updatedProduct;
    } else {
      throw new HttpException(
        'Unable to update a non-existent product',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteProduct(id: number): Promise<Products> {
    const productToDelete = await this.productsRepository.findOne({
      where: { id },
    });

    if (productToDelete) {
      return await this.productsRepository.remove(productToDelete);
    } else {
      throw new HttpException(
        'Unable to delete a non-existent product',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
