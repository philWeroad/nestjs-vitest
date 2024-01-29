import { EntityData } from '@mikro-orm/core';
import { Factory } from '@mikro-orm/seeder';
import { AuthorEntity } from '../author/entities/author.entity';
import { faker } from '@mikro-orm/seeder';

export class AuthorFactory extends Factory<AuthorEntity> {
  model = AuthorEntity;

  definition(): EntityData<AuthorEntity> {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      active: faker.datatype.boolean(),
      bio: faker.helpers.maybe(() => faker.lorem.words(10)),
    };
  }
}
