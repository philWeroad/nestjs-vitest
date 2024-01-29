import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmSetupForUnitTests } from '../../../../test/unit/mikroorm/mikroorm.setup';
import { AuthorFactory } from '../../factories/author.factory';
import { faker } from '@mikro-orm/seeder';
import { CreateBookUseCase, IBook } from './createBook.usecase';
import { BookRepository } from '../repositories/book.repository';

describe('CreateBookUseCase', () => {
  let module: TestingModule;
  let em: EntityManager;
  let useCase: CreateBookUseCase;
  let authorFactory: AuthorFactory;

  const mockBookRepository = {
    persistAndFlush: vi.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(mikroOrmSetupForUnitTests)],
      providers: [
        CreateBookUseCase,
        {
          provide: BookRepository,
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateBookUseCase>(CreateBookUseCase);
    em = module.get<EntityManager>(EntityManager).fork();
    authorFactory = new AuthorFactory(em);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Must create the book', async () => {
    const params: IBook = {
      name: faker.name.fullName(),
      code: faker.random.alphaNumeric(5).toUpperCase(),
    };
    const book = await useCase.execute(params);
    expect(book).toBeDefined();
  });
});
