import { EntityRepository } from '@mikro-orm/postgresql';
import { AuthorEntity } from '../entities/author.entity';

export class AuthorRepository extends EntityRepository<AuthorEntity> {}
