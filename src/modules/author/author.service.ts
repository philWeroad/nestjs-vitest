import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorEntity } from './entities/author.entity';
import { IAuthor } from './useCases/createAuthor.usecase';

@Injectable()
export class AuthorDomainService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async getAuthor(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOneOrFail(id);
    return author;
  }

  async createAuthor(params: IAuthor): Promise<AuthorEntity> {
    const newAuthor = this.authorRepository.create({ ...params, active: true });

    await this.authorRepository.persistAndFlush(newAuthor);

    return newAuthor;
  }
}
