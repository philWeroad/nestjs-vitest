import { Entity, ManyToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { AuthorEntity } from './author.entity';

@Entity({
  tableName: 'book',
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
    Object.assign(this, properties);
  }

  static create(params: { name: string; code: string }): BookEntity {
    return new BookEntity(params);
  }
}
