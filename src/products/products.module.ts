import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
})
export class ProductsModule {}
