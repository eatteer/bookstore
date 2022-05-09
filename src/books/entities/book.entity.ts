import { BookPurchase } from 'src/purchases/entities/book-purchase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BookSaleData } from './book-sale-data.entity';

@Entity()
export class Book {
  @PrimaryColumn()
  isbn13: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  thumbnail: string;

  @Column()
  genre: string;

  @Column({ default: 0 })
  rating: number;

  @Column()
  author: string;

  @OneToOne(() => BookSaleData, (bookSaleData) => bookSaleData.id)
  @JoinColumn()
  bookSaleData: BookSaleData;

  @OneToMany(() => BookPurchase, (bookPurchase) => bookPurchase.book)
  bookPurchase: BookPurchase[];
}
