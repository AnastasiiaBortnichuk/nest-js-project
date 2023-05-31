import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cosmetics } from './products.entity';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Cosmetics])],
  controllers: [ProductsController],
})
export class ProductsModule {}
