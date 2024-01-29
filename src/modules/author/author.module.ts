import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorDomainService } from './author.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorEntity } from './entities/author.entity';
import { ListAuthorsUseCase } from './useCases/listAuthors.usecase';
import { AuthorFactory } from '../factories/author.factory';
import { CreateAuthorsUseCase } from './useCases/createAuthor.usecase';
import { AssignBookUseCase } from './useCases/assignBook.usecase';
import { BookModule } from '../books/book.module';
import { BookEntity } from '../books/entities/book.entity';
import { BookFactory } from '../factories/book.factory';

@Module({
  imports: [MikroOrmModule.forFeature([AuthorEntity, BookEntity]), BookModule],
  controllers: [AuthorController],
  providers: [
    AuthorDomainService,
    ListAuthorsUseCase,
    CreateAuthorsUseCase,
    AssignBookUseCase,
    AuthorFactory,
    BookFactory,
  ],
  exports: [MikroOrmModule],
})
export class AuthorModule {}
