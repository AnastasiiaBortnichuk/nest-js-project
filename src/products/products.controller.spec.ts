import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './products.controller';
import { Cosmetics } from './products.entity';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';
import { TestProduct } from '../../common';

describe('ProductsController', () => {
  let moduleRef: TestingModule;
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Cosmetics]),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();
    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('getAllProducts', () => {
    const result = new Promise<Cosmetics[]>(() => new Array(TestProduct));
    it('should return All products object', async () => {
      jest
        .spyOn(productsService, 'getAllProducts')
        .mockImplementation(async () => await result);

      expect(productsController.getAllProducts()).toStrictEqual(result);
    });
  });

  describe('getProductsByType', () => {
    const result = new Promise<Cosmetics[]>(() => new Array(TestProduct));
    it('should return products object of given type', async () => {
      jest
        .spyOn(productsService, 'getProductsByType')
        .mockImplementation(async () => await result);

      expect(productsController.getProductsByType('mascara')).toStrictEqual(
        result,
      );
    });
  });

  describe('getProductById', () => {
    const result = new Promise<Cosmetics>(() => new Array(TestProduct));
    it('should return product object', async () => {
      jest
        .spyOn(productsService, 'getProductById')
        .mockImplementation(async () => await result);

      expect(productsController.getProductById('2', 'product')).toStrictEqual(
        result,
      );
    });
  });
});
