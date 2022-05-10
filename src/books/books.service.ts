import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterBookDto } from './dto/register-book.dto';
import { EditBookDto } from './dto/edit-book.dto';
import { Book } from './entities/book.entity';
import { BookSaleData } from './entities/book-sale-data.entity';
import axios from 'axios';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(BookSaleData)
    private bookSaleDataRepository: Repository<BookSaleData>,
  ) {}

  async findAll() {
    const books = await this.booksRepository
      .createQueryBuilder('book')
      .innerJoinAndSelect('book.bookSaleData', 'bookSaleData')
      .getMany();

    return books;
  }

  async findByIsbn(isbn13: string) {
    const book = await this.booksRepository.findOne(isbn13, {
      relations: ['bookSaleData'],
    });
    return book;
  }

  /* Find availables (stock > 0 and for sale) */
  async findAvailablesByKeyword(keyword: string) {
    const books = await this.booksRepository
      .createQueryBuilder('book')
      .innerJoinAndSelect('book.bookSaleData', 'bookSaleData')
      .where('book.isbn13 like :isbn13', { isbn13: `%${keyword}%` })
      .orWhere('book.title like :title', { title: `%${keyword}%` })
      .orWhere('book.genre like :genre', { genre: `%${keyword}%` })
      .orWhere('book.author like :author', { author: `%${keyword}%` })
      .having('bookSaleData.stock > :stock', { stock: 0 })
      .andHaving('bookSaleData.isForSale = :isForSale', { isForSale: true })
      .getMany();

    return books;
  }

  async register(registerBookDto: RegisterBookDto) {
    let savedBookSaleData;
    try {
      const book = new Book();
      const bookSaleData = new BookSaleData();
      const thumbnail =
        'https://2j2ysy3j2cg728eyxctyi8k1-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/book-cover-placeholder.png';

      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${registerBookDto.isbn13}`;
      const response = await axios.get(url);

      const data = response.data.items[0];

      bookSaleData.isForSale = registerBookDto.isForSale;
      bookSaleData.stock = registerBookDto.stock;
      bookSaleData.price = registerBookDto.price;

      savedBookSaleData = await this.bookSaleDataRepository.save(bookSaleData);

      book.isbn13 = data.volumeInfo?.industryIdentifiers?.find(
        (identifier) => identifier?.type === 'ISBN_13',
      )?.identifier;
      book.title = data.volumeInfo?.title || 'Unknwown';
      book.description = data.volumeInfo?.description || 'Unknown';
      book.thumbnail = data.volumeInfo?.imageLinks?.thumbnail || thumbnail;
      book.genre = data.volumeInfo?.categories?.[0] || 'Unknown';
      book.rating = data.volumeInfo?.averageRating || 0;
      book.author = data.volumeInfo?.authors[0] || 'Unknown';
      book.bookSaleData = savedBookSaleData;

      const savedBook = await this.booksRepository.save(book);
      return savedBook;
    } catch (error) {
      this.bookSaleDataRepository.remove(savedBookSaleData);
      throw error;
    }
  }

  async edit(isbn13: string, editBookDto: EditBookDto) {
    const book = await this.booksRepository.findOne(isbn13, {
      relations: ['bookSaleData'],
    });

    book.bookSaleData.isForSale = editBookDto.isForSale;
    book.bookSaleData.stock = editBookDto.stock;
    book.bookSaleData.price = editBookDto.price;

    await this.bookSaleDataRepository.save(book.bookSaleData);

    const updatedBook = this.booksRepository.findOne(isbn13, {
      relations: ['bookSaleData'],
    });

    return updatedBook;
  }
}
