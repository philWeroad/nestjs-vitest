import { EntityRepository } from '@mikro-orm/postgresql';
import { BookEntity } from '../entities/book.entity';

export class BookRepository extends EntityRepository<BookEntity> {}
