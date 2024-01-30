import { Entity, ManyToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { BookRepository } from '../repositories/book.repository';
import { AuthorEntity } from '../../author/entities/author.entity';
// import _ from 'lodash';

@Entity({
  tableName: 'book',
  customRepository: () => BookRepository,
})
export class BookEntity {
  @PrimaryKey({ type: 'uuid', nullable: false })
  id: string = uuidv4();

  @Property()
  name: string;

  @Property()
  code: string;

  @ManyToOne(() => AuthorEntity)
  author: Rel<AuthorEntity>;

  constructor(properties: { name: string; code: string }) {
    // _.assign(this, properties);
    Object.assign(this, properties);
  }

  static create(params: { name: string; code: string }): BookEntity {
    return new BookEntity(params);
  }
}
