import { Injectable } from '@nestjs/common';
import { AuthorDomainService } from '../author.service';
import { AuthorEntity } from '../entities/author.entity';

@Injectable()
export class ListAuthorsUseCase {
  constructor(private readonly authorDomainService: AuthorDomainService) {}

  async execute(id: string): Promise<AuthorEntity> {
    return this.authorDomainService.getAuthor(id);
  }
}
