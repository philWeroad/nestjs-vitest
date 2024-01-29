import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BookEntity } from './entities/book.entity';
import { BookController } from './book.controller';
import { CreateBookUseCase } from './useCases/createBook.usecase';
import { BookRepository } from './repositories/book.repository';

@Module({
  imports: [MikroOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [CreateBookUseCase, BookRepository],
  exports: [MikroOrmModule, BookRepository],
})
export class BookModule {}
