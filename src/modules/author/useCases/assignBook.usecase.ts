import { Injectable } from '@nestjs/common';
import { BookRepository } from '../../books/repositories/book.repository';
import { AuthorRepository } from '../repositories/author.repository';
import { AuthorEntity } from '../entities/author.entity';

@Injectable()
export class AssignBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  async execute(params: {
    authorId: string;
    bookId: string;
  }): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOneOrFail(params.authorId);
    const book = await this.bookRepository.findOneOrFail(params.bookId);

    author.books.add(book);

    await this.authorRepository.persistAndFlush(author);

    console.log(author);

    return author;
  }
}
