import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { AuthorDomainService } from '../author.service';
import { EntityManager, Loaded } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmSetupForUnitTests } from '../../../../test/unit/mikroorm/mikroorm.setup';
import { AuthorFactory } from '../../factories/author.factory';
import { faker } from '@mikro-orm/seeder';
import { AssignBookUseCase } from './assignBook.usecase';
import { BookRepository } from '../../books/repositories/book.repository';
import { AuthorRepository } from '../repositories/author.repository';
import { BookFactory } from '../../factories/book.factory';
import { AuthorEntity } from '../entities/author.entity';

describe('AssignBookUseCase', () => {
  let module: TestingModule;
  let em: EntityManager;
  let useCase: AssignBookUseCase;
  let authorFactory: AuthorFactory;
  let bookFactory: BookFactory;

  const mockBookRepository = {
    findOneOrFail: vi.fn(),
  };

  const mockAuthorRepository = {
    findOneOrFail: vi.fn(),
    persistAndFlush: vi.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(mikroOrmSetupForUnitTests)],
      providers: [
        AssignBookUseCase,
        {
          provide: BookRepository,
          useValue: mockBookRepository,
        },
        {
          provide: AuthorRepository,
          useValue: mockAuthorRepository,
        },
      ],
    }).compile();

    useCase = module.get<AssignBookUseCase>(AssignBookUseCase);
    em = module.get<EntityManager>(EntityManager).fork();
    authorFactory = new AuthorFactory(em);
    bookFactory = new BookFactory(em);

    vi.spyOn(
      module.get(AuthorRepository),
      'findOneOrFail',
    ).mockResolvedValueOnce(
      authorFactory.makeOne() as Loaded<AuthorEntity, string>,
    );

    vi.spyOn(module.get(BookRepository), 'findOneOrFail').mockResolvedValueOnce(
      bookFactory.makeOne(),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Must assign the author', async () => {
    const params = {
      authorId: faker.datatype.uuid(),
      bookId: faker.datatype.uuid(),
    };
    const author = await useCase.execute(params);

    expect(author).toBeDefined();
  });
});
