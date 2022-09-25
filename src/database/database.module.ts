import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/products.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Umk@1602',
      database: 'postgres',
      entities: [Products],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
