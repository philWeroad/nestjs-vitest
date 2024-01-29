import { Module } from '@nestjs/common';
import { AuthorController } from '../author/author.controller';
import { AuthorDomainService } from '../author/author.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorEntity } from '../author/entities/author.entity';
import { ListAuthorsUseCase } from '../author/useCases/listAuthors.usecase';
import { AuthorFactory } from '../factories/author.factory';
import { CreateAuthorsUseCase } from '../author/useCases/createAuthor.usecase';
import { BookEntity } from './entities/book.entity';
import { BookController } from './book.controller';
import { CreateBookUseCase } from './useCases/createBook.usecase';

@Module({
  imports: [MikroOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [CreateBookUseCase],
  exports: [MikroOrmModule],
})
export class BookModule {}
