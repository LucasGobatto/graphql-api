import { CryptoService } from 'chore/security/crypto';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

async function exec({ password, email }: { password: string; email: string }): Promise<boolean> {
  const user = await getRepository(User).findOne({ email });

  if (!user) {
    throw new Error('User not found.');
  }

  return await CryptoService.verify(password, user.password);
}

export const ValidateLoginUseCase = {
  exec,
};
