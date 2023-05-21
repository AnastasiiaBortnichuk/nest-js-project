import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
