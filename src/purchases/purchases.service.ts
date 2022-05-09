import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { EditBookDto } from 'src/books/dto/edit-book.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { RegisterPurchaseDto } from './dto/register-purchase-dto';
import { BookPurchase } from './entities/book-purchase.entity';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    private usersService: UsersService,
    private booksServices: BooksService,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(BookPurchase)
    private bookPurchase: Repository<BookPurchase>,
  ) {}

  async register(userId: number, registerPurchaseDto: RegisterPurchaseDto) {
    const purchase = new Purchase();
    const user = await this.usersService.findById(userId);

    /* Configure and save purchase to database */
    purchase.user = user;
    purchase.total = registerPurchaseDto.total;
    const savedPurchase = await this.purchaseRepository.save(purchase);

    /* Configure purchase data of every book and save to database */
    registerPurchaseDto.bookPurchases.map(async (bookPurchase) => {
      const purchaseToBook = new BookPurchase();
      purchaseToBook.purchase = savedPurchase;
      purchaseToBook.book = bookPurchase.book;
      purchaseToBook.quantity = bookPurchase.quantity;
      purchaseToBook.total = bookPurchase.total;

      /* Reduce stock of book */
      const editBookDto: EditBookDto = {
        stock: bookPurchase.book.bookSaleData.stock - bookPurchase.quantity,
        price: bookPurchase.book.bookSaleData.price,
        isForSale: bookPurchase.book.bookSaleData.isForSale,
      };

      await this.booksServices.edit(bookPurchase.book.isbn13, editBookDto);
      await this.bookPurchase.save(purchaseToBook);
    });
  }

  async findByUserId(id: number) {
    const purchaseHistory = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .innerJoinAndSelect('purchase.bookPurchases', 'bookPurchase')
      .innerJoinAndSelect('bookPurchase.book', 'book')
      .where('purchase.userId like :userId', { userId: id })
      .getMany();

    return purchaseHistory;
  }
}
