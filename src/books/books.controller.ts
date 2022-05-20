import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { RegisterBookDto } from './dto/register-book.dto';
import { EditBookDto } from './dto/edit-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role, Roles } from 'src/auth/roles.decorators';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('availables')
  async findAvailablesByKeyword(@Query('keyword') keyword: string) {
    try {
      const books = await this.booksService.findAvailablesByKeyword(keyword);
      return books;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':isbn13')
  async findByIsbn(@Param('isbn13') isbn13: string) {
    try {
      return await this.booksService.findByIsbn13(isbn13);
    } catch (error) {
      console.error(error);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query('keyword') keyword: string) {
    try {
      if (keyword) {
        return await this.booksService.findAllByKeyword(keyword);
      }
      return await this.booksService.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async register(@Body() registerBookDto: RegisterBookDto) {
    try {
      return await this.booksService.register(registerBookDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'))
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
