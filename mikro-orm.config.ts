import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';

export default {
  metadataProvider: TsMorphMetadataProvider,
  namingStrategy: EntityCaseNamingStrategy,
  entities: ['./dist/**/entities/**/*.entity.js'],
  entitiesTs: ['./src/**/entities/**/*.entity.ts'],
  //   migrations: {
  //     path: './src/migrations',
  //     pattern: /^[\w-]+\d+\.js$/,
  //     emit: 'js',
  //     disableForeignKeys: false, //https://github.com/mikro-orm/mikro-orm/issues/190
  //   },
  debug: true,
  type: 'postgresql',
  dbName: 'vitest',
  host: 'localhost',
  port: 25432,
  user: 'dev',
  password: 'password',
  persistOnCreate: false,
};
