import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorDomainService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async getAuthor(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOneOrFail(id);
    return author;
  }
}
