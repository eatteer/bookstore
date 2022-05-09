import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  /* One client have many purchases */
  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
