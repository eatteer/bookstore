import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookSaleData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isForSale: boolean;

  @Column()
  stock: number;

  @Column()
  price: number;
}
