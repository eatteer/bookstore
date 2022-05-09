import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookPurchase } from './book-purchase.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  /* Many purchases belongs to one costumer */
  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  total: number;

  @OneToMany(() => BookPurchase, (bookPurchase) => bookPurchase.purchase)
  bookPurchases: BookPurchase[];
}
