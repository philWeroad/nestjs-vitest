import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { AuthorRepository } from '../repositories/author.repository';
import { BookEntity } from '../../books/entities/book.entity';

@Entity({
  tableName: 'author',
  customRepository: () => AuthorRepository,
})
export class AuthorEntity {
  @PrimaryKey({ type: 'uuid', nullable: false })
  id: string = uuidv4();

  @Property()
  name: string;

  @Property()
  email: string;

  @Property({ type: 'text', nullable: true })
  bio? = '';

  @Property()
  active: boolean;

  @OneToMany({ mappedBy: 'author' })
  books = new Collection<BookEntity>(this);
}
