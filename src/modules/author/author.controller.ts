import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorEntity } from './entities/author.entity';
import { ListAuthorsUseCase } from './useCases/listAuthors.usecase';
import { CreateAuthorsUseCase } from './useCases/createAuthor.usecase';

interface CreateAuthorDto {
  name: string;
  email: string;
  bio?: string;
}

@Controller('author')
export class AuthorController {
  constructor(
    private readonly listAuthorsUseCase: ListAuthorsUseCase,
    private readonly createAuthorsUseCase: CreateAuthorsUseCase,
  ) {}

  @Get(':id')
  async getAuthors(@Param() id: string): Promise<AuthorEntity> {
    return this.listAuthorsUseCase.execute(id);
  }

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return this.createAuthorsUseCase.execute(createAuthorDto);
  }
}
