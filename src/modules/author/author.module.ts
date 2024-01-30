import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorDomainService } from './author.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorEntity } from './entities/author.entity';
import { AuthorFactory } from '../factories/author.factory';
import { CreateAuthorsUseCase } from './useCases/createAuthor.usecase';
import { BookEntity } from './entities/book.entity';
import { BookFactory } from '../factories/book.factory';

@Module({
  imports: [MikroOrmModule.forFeature([AuthorEntity, BookEntity])],
  controllers: [AuthorController],
  providers: [
    AuthorDomainService,
    CreateAuthorsUseCase,
    AuthorFactory,
    BookFactory,
  ],
  exports: [MikroOrmModule],
})
export class AuthorModule {}
