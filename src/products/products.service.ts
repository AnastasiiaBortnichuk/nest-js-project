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
    return (await this.productsRepository.find()).filter(
      (product) => product.product_type === type,
    );
  }

  async getProductById(id: string): Promise<Cosmetics> {
    return (await this.productsRepository.find()).find(
      (product) => product.id === +id,
    );
  }

  async addProduct(product: Cosmetics): Promise<Cosmetics> {
    console.log('ADD PRODUCT', product);
    const newProduct = await this.productsRepository.create(product);
    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async updateProduct(id: string, product: Cosmetics) {
    await this.productsRepository.update(id, product);
    const allProducts = await this.productsRepository.find();
    const updatedProduct = await allProducts.find(
      (product) => product.id === +id,
    );
    if (updatedProduct) {
      return updatedProduct;
    }
  }

  async deleteProduct(id: number) {
    const allProducts = await this.productsRepository.find();
    const productToDelete = await allProducts.find(
      (product) => product.id === id,
    );

    return await this.productsRepository.remove(productToDelete);
  }
}
