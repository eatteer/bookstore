import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'development-instance.mysql.database.azure.com',
      port: 3306,
      username: 'dbadmin',
      password: '$0password',
      database: 'alexandria',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    BooksModule,
    PurchasesModule,
  ],
})
export class AppModule {}
