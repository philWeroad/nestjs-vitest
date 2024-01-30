import { Injectable } from '@nestjs/common';
import { AuthorDomainService } from '../author.service';
import { AuthorEntity } from '../entities/author.entity';

export interface IAuthor {
  name: string;
  email: string;
  bio?: string;
  books?: [
    {
      name: string;
      code: string;
    },
  ];
}

@Injectable()
export class CreateAuthorsUseCase {
  constructor(private readonly authorDomainService: AuthorDomainService) {}

  async execute(params: IAuthor): Promise<AuthorEntity> {
    return this.authorDomainService.createAuthor(params);
  }
}
