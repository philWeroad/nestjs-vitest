import { Controller, Get, Param } from '@nestjs/common';
import { AuthorDomainService } from './author.service';
import { AuthorEntity } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorDomainService) {}

  @Get(':id')
  async getAuthors(@Param() id: string): Promise<AuthorEntity> {
    return this.authorService.getAuthor(id);
  }
}
