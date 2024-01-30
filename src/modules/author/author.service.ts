import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorEntity } from './entities/author.entity';
import { IAuthor } from './useCases/createAuthor.usecase';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class AuthorDomainService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async createAuthor(params: IAuthor): Promise<AuthorEntity> {
    const newAuthor = AuthorEntity.create({
      ...params,
      active: true,
      books: params.books.map((item) => BookEntity.create(item)),
    });

    await this.authorRepository.persistAndFlush(newAuthor);

    return newAuthor;
  }
}
