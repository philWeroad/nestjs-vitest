import { Controller, Get, Param } from '@nestjs/common';
import { AuthorEntity } from './entities/author.entity';
import { ListAuthorsUseCase } from './useCases/listAuthors.usecase';

@Controller('author')
export class AuthorController {
  constructor(private readonly listAuthorsUseCase: ListAuthorsUseCase) {}

  @Get(':id')
  async getAuthors(@Param() id: string): Promise<AuthorEntity> {
    return this.listAuthorsUseCase.execute(id);
  }
}
