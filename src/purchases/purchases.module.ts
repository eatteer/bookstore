import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';
import { BookPurchase } from './entities/book-purchase.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    TypeOrmModule.forFeature([Purchase, BookPurchase]),
  ],
  providers: [PurchasesService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
