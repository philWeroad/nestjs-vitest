import { EntityData } from '@mikro-orm/core';
import { Factory } from '@mikro-orm/seeder';
import { faker } from '@mikro-orm/seeder';
import { BookEntity } from '../books/entities/book.entity';

export class BookFactory extends Factory<BookEntity> {
  model = BookEntity;

  definition(): EntityData<BookEntity> {
    return {
      name: faker.name.fullName(),
      code: faker.random.alpha(10).toUpperCase(),
    };
  }
}
