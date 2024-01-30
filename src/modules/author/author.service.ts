import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorEntity } from './entities/author.entity';
import { IAuthor } from './useCases/createAuthor.usecase';
import { BookEntity } from '../books/entities/book.entity';

@Injectable()
export class AuthorDomainService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async getAuthor(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOneOrFail(id, {
      populate: ['books'],
    });

    return author;
  }

  // async createAuthor(params: IAuthor): Promise<AuthorEntity> {
  //   const newAuthor = this.authorRepository.create({ ...params, active: true });

  //   await this.authorRepository.persistAndFlush(newAuthor);

  //   return newAuthor;
  // }

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
