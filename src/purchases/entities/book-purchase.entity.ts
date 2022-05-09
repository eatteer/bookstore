import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Purchase } from './purchase.entity';

/* Intermediate table */
/* id - [purchaseId] - [bookIsbn13] - quantity */
@Entity()
export class BookPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  /* One purchase can be many times in the intermediate table BookPurchase */
  @ManyToOne(() => Purchase, (purchase) => purchase.id)
  purchase: Purchase;

  /* One book can be many times in the intermediate table BookPurchase */
  @ManyToOne(() => Book, (book) => book.isbn13)
  book: Book;

  @Column()
  quantity: number;

  @Column()
  total: number;
}
