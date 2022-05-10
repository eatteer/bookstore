import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { RegisterBookDto } from './dto/register-book.dto';
import { EditBookDto } from './dto/edit-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('availables')
  async findAvailablesByKeyword(@Query('keyword') keyword: string) {
    try {
      return await this.booksService.findAvailablesByKeyword(keyword);
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':isbn13')
  async findByIsbn(@Param('isbn13') isbn13: string) {
    try {
      return await this.booksService.findByIsbn(isbn13);
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.booksService.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  @Post()
  async register(@Body() registerBookDto: RegisterBookDto) {
    try {
      return await this.booksService.register(registerBookDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':isbn13')
  async edit(
    @Param('isbn13') isbn13: string,
    @Body() editBookDto: EditBookDto,
  ) {
    try {
      return await this.booksService.edit(isbn13, editBookDto);
    } catch (error) {
      console.error(error);
    }
  }
}
