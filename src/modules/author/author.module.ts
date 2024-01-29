import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorDomainService } from './author.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorEntity } from './entities/author.entity';
import { ListAuthorsUseCase } from './useCases/listAuthors.usecase';
import { AuthorFactory } from '../factories/author.factory';

@Module({
  imports: [MikroOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorController],
  providers: [AuthorDomainService, ListAuthorsUseCase, AuthorFactory],
  exports: [MikroOrmModule],
})
export class AuthorModule {}
