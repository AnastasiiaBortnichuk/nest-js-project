import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cosmetics } from './products.entity';
import CreateProductDto from './dto/createProduct.dto';

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

  async getProductById(id: number): Promise<Cosmetics> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async addProduct(product: CreateProductDto): Promise<Cosmetics> {
    const newProduct = await this.productsRepository.create(product);
    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async updateProduct(id: number, product: CreateProductDto) {
    const productToUpdate = await this.productsRepository.findOne({
      where: { id },
    });
    if (productToUpdate) {
      await this.productsRepository.update(id, product);

      return productToUpdate;
    } else {
      throw new HttpException(
        'Unable to update a non-existent product',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteProduct(id: number) {
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
