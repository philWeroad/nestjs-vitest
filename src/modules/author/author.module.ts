import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorDomainService } from './author.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorEntity } from './entities/author.entity';
import { ListAuthorsUseCase } from './useCases/listAuthors.usecase';
import { AuthorFactory } from '../factories/author.factory';
import { CreateAuthorsUseCase } from './useCases/createAuthor.usecase';

@Module({
  imports: [MikroOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorController],
  providers: [
    AuthorDomainService,
    ListAuthorsUseCase,
    CreateAuthorsUseCase,
    AuthorFactory,
  ],
  exports: [MikroOrmModule],
})
export class AuthorModule {}
