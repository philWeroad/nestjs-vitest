import { Injectable } from '@nestjs/common';
import { BookEntity } from '../entities/book.entity';
import { BookRepository } from '../repositories/book.repository';

export interface IBook {
  name: string;
  code: string;
}

@Injectable()
export class CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(params: IBook): Promise<BookEntity> {
    const newBook = BookEntity.create(params);

    await this.bookRepository.persistAndFlush(newBook);

    return newBook;
  }
}
