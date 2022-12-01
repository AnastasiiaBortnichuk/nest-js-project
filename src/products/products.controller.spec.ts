import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './products.controller';
import { Cosmetics } from './products.entity';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';

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

  describe('getProductById', () => {
    it('should return product object', async () => {
      const product = {
        id: 2,
        brand: "L'Oreal",
        name: "L' Oreal Paris Voluminous Mascara",
        description: 'Voluminous - Volume Building Waterproof Mascara',
        product_type: 'mascara',
        api_featured_image:
          '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/002/original/data?1514061106',
        price_sign: null,
        product_colors: [
          { hex_value: '#231F20', colour_name: 'Black ' },
          { hex_value: '#4D2C00', colour_name: 'Black Brown ' },
          { hex_value: '#030000', colour_name: 'Carbon Black ' },
        ],
        price: '15',
      };
      const result = new Promise<Cosmetics>(() => product);
      jest
        .spyOn(productsService, 'getProductById')
        .mockImplementation(async () => await result);
      expect(await productsController.getProductById('2', 'product')).toBe(
        result,
      );
    });
  });
});
