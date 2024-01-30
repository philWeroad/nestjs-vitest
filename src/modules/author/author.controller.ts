import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorEntity } from './entities/author.entity';
import { ListAuthorsUseCase } from './useCases/listAuthors.usecase';
import { CreateAuthorsUseCase } from './useCases/createAuthor.usecase';
import { AssignBookUseCase } from './useCases/assignBook.usecase';

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
  constructor(
    private readonly listAuthorsUseCase: ListAuthorsUseCase,
    private readonly createAuthorsUseCase: CreateAuthorsUseCase,
    private readonly assignBookUseCase: AssignBookUseCase,
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

  @Post('assign')
  async assignBook(
    @Body() createBookDto: { authorId: string; bookId: string },
  ): Promise<AuthorEntity> {
    return this.assignBookUseCase.execute(createBookDto);
  }
}
