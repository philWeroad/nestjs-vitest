import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorsUseCase } from './useCases/createAuthor.usecase';

interface CreateAuthorDto {
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

@Controller('author')
export class AuthorController {
  constructor(private readonly createAuthorsUseCase: CreateAuthorsUseCase) {}

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return this.createAuthorsUseCase.execute(createAuthorDto);
  }
}
