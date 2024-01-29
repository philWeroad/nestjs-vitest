import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { faker } from '@mikro-orm/seeder';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorDomainService } from './author.service';
import { AuthorFactory } from '../factories/author.factory';
import { mikroOrmSetupForUnitTests } from '../../../test/unit/mikroorm/mikroorm.setup';

describe('AuthorDomainService', () => {
  let module: TestingModule;
  let em: EntityManager;
  let service: AuthorDomainService;
  let authorFactory: AuthorFactory;

  const mockAuthorRepository = {
    findOneOrFail: vi.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(mikroOrmSetupForUnitTests)],
      providers: [
        AuthorDomainService,
        {
          provide: AuthorRepository,
          useValue: mockAuthorRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorDomainService>(AuthorDomainService);
    em = module.get<EntityManager>(EntityManager).fork();
    authorFactory = new AuthorFactory(em);

    vi.spyOn(
      module.get(AuthorRepository),
      'findOneOrFail',
    ).mockResolvedValueOnce(authorFactory.makeOne());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Must retrieve the author', async () => {
    const id = faker.datatype.uuid();
    const author = await service.getAuthor(id);

    expect(author).toBeDefined();
  });
});
