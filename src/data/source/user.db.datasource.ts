import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserEntity } from "@entity";
import { PaginatedInputType } from "@domain/model";
import { GetUncatchedError } from "@core/decorators/get-uncatched-error.decorator";
import { InputError } from "@core/error";

@Service()
export class UserDbDataSource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  @GetUncatchedError(InputError)
  findById(id: string) {
    return this.repository.findOne(id);
  }

  @GetUncatchedError()
  findOneByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  @GetUncatchedError()
  findAndCount({ take, skip }: PaginatedInputType) {
    return this.repository.findAndCount({ order: { id: "ASC" }, take, skip });
  }

  @GetUncatchedError()
  save(user: Partial<UserEntity>) {
    return this.repository.save(user);
  }
}
