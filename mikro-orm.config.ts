import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';

export default {
  metadataProvider: TsMorphMetadataProvider,
  namingStrategy: EntityCaseNamingStrategy,
  entities: ['./dist/**/entities/**/*.entity.js'],
  entitiesTs: ['./src/**/entities/**/*.entity.ts'],
  debug: true,
  type: 'postgresql',
  dbName: 'vitest',
  host: 'localhost',
  port: 25432,
  user: 'dev',
  password: 'password',
  persistOnCreate: false,
};
