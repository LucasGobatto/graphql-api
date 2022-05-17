import { CRYPTO_BYTE_LENGTH, CRYPTO_KEY_LENGTH } from "@core/env/env.config";
import * as crypto from "crypto";
import { Inject, Service } from "typedi";

@Service()
export class CryptoService {
  constructor(
    @Inject(CRYPTO_BYTE_LENGTH) private readonly byteLength: number,
    @Inject(CRYPTO_KEY_LENGTH) private readonly keyLength: number
  ) {}

  hash(value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(this.byteLength).toString("hex");

      crypto.scrypt(value, salt, this.keyLength, (err, derivedKey) => {
        if (err) {
          reject(err);
        }

        resolve(salt + ":" + derivedKey.toString("hex"));
      });
    });
  }

  verify(value: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");

      crypto.scrypt(value, salt, this.keyLength, (err, derivedKey) => {
        if (err) {
          reject(err);
        }

        resolve(key === derivedKey.toString("hex"));
      });
    });
  }
}
