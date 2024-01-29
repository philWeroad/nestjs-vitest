import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { RequestContextMiddleware } from './middlewares/requestContext.middleware';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      metadataProvider: TsMorphMetadataProvider,
      namingStrategy: EntityCaseNamingStrategy,
      entities: ['./dist/**/entities/**/*.entity.js'],
      entitiesTs: ['./src/**/entities/**/*.entity.ts'],
      debug: true,
      type: 'postgresql',
      dbName: 'vitest',
      host: 'localhost',
      port: 11432,
      user: 'dev',
      password: 'password',
      persistOnCreate: false,
    }),
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('');
  }
}
