import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { EntityManager, Loaded } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { faker } from '@mikro-orm/seeder';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorDomainService } from './author.service';
import { AuthorFactory } from '../factories/author.factory';
import { mikroOrmSetupForUnitTests } from '../mikroorm.setup';
import { IAuthor } from './useCases/createAuthor.usecase';

describe('AuthorDomainService', () => {
  let module: TestingModule;
  let em: EntityManager;
  let service: AuthorDomainService;
  let authorFactory: AuthorFactory;

  const mockAuthorRepository = {
    findOneOrFail: vi.fn(),
    create: vi.fn(),
    persistAndFlush: vi.fn(),
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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Must create the author', async () => {
    const params: IAuthor = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      books: [
        {
          name: faker.lorem.word(2),
          code: faker.random.alpha(15).toUpperCase(),
        },
      ],
    };

    const author = await service.createAuthor(params);

    expect(author.name).toBe(params.name);
    expect(author.email).toBe(params.email);

    const book = author.books[0];
    expect(author.books).length(params.books.length);
    expect(book.name).toBe(params.books[0].name);
    expect(book.code).toBe(params.books[0].code);
  });
});
