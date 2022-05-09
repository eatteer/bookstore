import { BookPurchaseDto } from './book-purchase-dto';

export class RegisterPurchaseDto {
  bookPurchases: BookPurchaseDto[];
  total: number;
}
