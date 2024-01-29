import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { AuthorDomainService } from '../author.service';
import { EntityManager } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmSetupForUnitTests } from '../../../../test/unit/mikroorm/mikroorm.setup';
import { AuthorFactory } from '../../factories/author.factory';
import { faker } from '@mikro-orm/seeder';
import { CreateAuthorsUseCase, IAuthor } from './createAuthor.usecase';

describe('CreateAuthorsUseCase', () => {
  let module: TestingModule;
  let em: EntityManager;
  let useCase: CreateAuthorsUseCase;
  let authorFactory: AuthorFactory;

  const mockAuthorDomainService = {
    createAuthor: vi.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(mikroOrmSetupForUnitTests)],
      providers: [
        CreateAuthorsUseCase,
        {
          provide: AuthorDomainService,
          useValue: mockAuthorDomainService,
        },
      ],
    }).compile();

    useCase = module.get<CreateAuthorsUseCase>(CreateAuthorsUseCase);
    em = module.get<EntityManager>(EntityManager).fork();
    authorFactory = new AuthorFactory(em);

    vi.spyOn(
      module.get(AuthorDomainService),
      'createAuthor',
    ).mockResolvedValueOnce(authorFactory.makeOne());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Must create the author', async () => {
    const params: IAuthor = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      bio: faker.helpers.maybe(() => faker.lorem.words(20)),
    };
    const author = await useCase.execute(params);

    expect(author).toBeDefined();
  });
});
