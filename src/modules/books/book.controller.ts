import { Body, Controller, Post } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';
import { CreateBookUseCase } from './useCases/createBook.usecase';

interface CreateBookDto {
  name: string;
  code: string;
}

@Controller('book')
export class BookController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.createBookUseCase.execute(createBookDto);
  }
}
