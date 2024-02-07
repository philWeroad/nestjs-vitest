import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { EntityCaseNamingStrategy } from "@mikro-orm/core";
import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";

export const mikroOrmSetupForUnitTests: MikroOrmModuleSyncOptions = {
  metadataProvider: TsMorphMetadataProvider,
  namingStrategy: EntityCaseNamingStrategy,
  entities: ["./dist/**/entities/*.entity.js"],
  entitiesTs: ["./src/**/entities/*.entity.ts"],
  type: "postgresql",
  dbName: "foo",
  connect: false,
  dynamicImportProvider: (id) => import(id),
};
