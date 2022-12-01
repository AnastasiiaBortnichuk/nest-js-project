import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { Cosmetics } from './products.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      imports: [
        TypeOrmModule.forFeature([Cosmetics]),
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('ProductsService - should be defined', () => {
    expect(service).toBeDefined();
  });
});
