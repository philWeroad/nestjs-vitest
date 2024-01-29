import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { AuthorDomainService } from '../author.service';
import { EntityManager } from '@mikro-orm/core';
import { ListAuthorsUseCase } from './listAuthors.usecase';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmSetupForUnitTests } from '../../../../test/unit/mikroorm/mikroorm.setup';
import { AuthorFactory } from '../../factories/author.factory';
import { faker } from '@mikro-orm/seeder';

describe('ListAuthorsUseCase', () => {
  let module: TestingModule;
  let em: EntityManager;
  let useCase: ListAuthorsUseCase;
  let authorFactory: AuthorFactory;

  const mockAuthorDomainService = {
    getAuthor: vi.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(mikroOrmSetupForUnitTests)],
      providers: [
        ListAuthorsUseCase,
        {
          provide: AuthorDomainService,
          useValue: mockAuthorDomainService,
        },
      ],
    }).compile();

    useCase = module.get<ListAuthorsUseCase>(ListAuthorsUseCase);
    em = module.get<EntityManager>(EntityManager).fork();
    authorFactory = new AuthorFactory(em);

    vi.spyOn(
      module.get(AuthorDomainService),
      'getAuthor',
    ).mockResolvedValueOnce(authorFactory.makeOne());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Must retrieve the author', async () => {
    const id = faker.datatype.uuid();
    const author = await useCase.execute(id);

    expect(author).toBeDefined();
  });
});
