import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DatabaseModule } from '../../database/database.module';
import { ProductsController } from '../products.controller';
import { Products } from '../products.entity';
import { ProductsService } from '../products.service';
import { ConfigModule } from '@nestjs/config';
import { TestProduct } from '../../../test/common';

describe('ProductsController', () => {
  let moduleRef: TestingModule;
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Products]),
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
    const result = new Promise<Products[]>(() => new Array(TestProduct));
    it('should return All products object', async () => {
      jest
        .spyOn(productsService, 'getAllProducts')
        .mockImplementation(async () => await result);

      expect(productsController.getAllProducts()).toStrictEqual(result);
    });
  });

  describe('getProductsByType', () => {
    const result = new Promise<Products[]>(() => new Array(TestProduct));
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
    const result = new Promise<Products>(() => new Array(TestProduct));
    it('should return product object', async () => {
      jest
        .spyOn(productsService, 'getProductById')
        .mockImplementation(async () => await result);

      expect(productsController.getProductById(2, 'product')).toStrictEqual(
        result,
      );
    });
  });

  describe('addProduct', () => {
    it('should add new product', async () => {
      jest
        .spyOn(productsService, 'addProduct')
        .mockImplementation((TestProduct: Products) =>
          Promise.resolve({ id: 'a uuid', ...TestProduct }),
        );

      await expect(productsController.addProduct(TestProduct)).resolves.toEqual(
        { id: 'a uuid', ...TestProduct },
      );
    });
  });

  describe('updateProduct', () => {
    it('should update existing product', async () => {
      jest
        .spyOn(productsService, 'updateProduct')
        .mockImplementation((id: 7, TestProduct: Products) =>
          Promise.resolve({ id, ...TestProduct }),
        );

      await expect(
        productsController.updateProduct(7, TestProduct),
      ).resolves.toEqual({ id: 7, ...TestProduct });
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', async () => {
      jest
        .spyOn(productsService, 'deleteProduct')
        .mockImplementation((id: 7) => Promise.resolve({ id, ...TestProduct }));

      await expect(productsController.deleteProduct(7)).resolves.toEqual({
        id: 7,
        ...TestProduct,
      });
    });
  });
});
