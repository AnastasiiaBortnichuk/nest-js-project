import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestProduct } from '../../../test/common';
import { DatabaseModule } from '../../database/database.module';
import { Products } from '../products.entity';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  const TotalProducts = 928;
  const EyebrowProducts = 49;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      imports: [
        TypeOrmModule.forFeature([Products]),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('ProductsService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllProducts should work', async () => {
    const result = await service.getAllProducts();
    expect(result.length).toEqual(TotalProducts);
  });

  it('getProductsByType - should work', async () => {
    const result = await service.getProductsByType('eyebrow');
    expect(result.length).toEqual(EyebrowProducts);
  });

  it('getProductById - should work', async () => {
    const result = await service.getProductById(2);
    expect(result).toEqual(TestProduct);
  });
});
