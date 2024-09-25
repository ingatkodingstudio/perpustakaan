import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Auth, Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) { }

  async create(createAuthorDto: CreateAuthorDto) {
    const author = new Author();
    author.name = createAuthorDto.name;

    if (createAuthorDto.imageUrl) {
      author.imageUrl = createAuthorDto.imageUrl;
    }

    return await this.authorRepository.save(author);
  }

  findAll() {
    return this.authorRepository.find();
  }

  findOne(id: number) {
    return this.authorRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (author) {
      Object.assign(author, updateAuthorDto);

      return this.authorRepository.save(author);
    }

    throw new NotFoundException();
  }

  remove(id: number) {
    return this.authorRepository.delete(id);
  }
}
