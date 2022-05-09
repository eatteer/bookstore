import { Book } from 'src/books/entities/book.entity';

export class BookPurchaseDto {
  book: Book;
  quantity: number;
  total: number;
}
