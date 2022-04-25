import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserEntity } from "@entity";
import { PaginatedInputType } from "@domain/model";

@Service()
export class UserDbDataSource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  findById(id: string) {
    return this.repository.findOne(id);
  }

  findOneByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  findAndCount({ take, skip }: PaginatedInputType) {
    return this.repository.findAndCount({ order: { id: "ASC" }, take, skip });
  }
}
