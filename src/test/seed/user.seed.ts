import { CryptoService } from "@core/security/crypto";
import { UserEntity } from "@entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserSeed {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cryptoService: CryptoService
  ) {}

  async create(options: Partial<UserEntity>[] = []): Promise<UserEntity[]> {
    const users = [...new Array(options.length || 5)].map((_, index) =>
      this.seed(options[index], index + 1)
    );

    return this.userRepository.save(await Promise.all(users));
  }

  private async seed(options: Partial<UserEntity> = {}, count: number) {
    options.password = await this.cryptoService.hash(
      options.password ?? "1234qwer"
    );

    const defaultUser = {
      name: `User Name ${count}`,
      email: `fake${count}@email.com`,
      password: options.password,
      phone: "99999999999",
    };

    return Object.assign(new UserEntity(), defaultUser, options);
  }
}
