import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorDomainService } from './author.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorEntity } from './entities/author.entity';

@Module({
  imports: [MikroOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorController],
  providers: [AuthorDomainService],
  exports: [MikroOrmModule],
})
export class AuthorModule {}
