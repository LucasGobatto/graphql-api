import { CryptoService } from '../../chore/security/crypto';
import { UserType } from '../../schema/schema.types';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

export async function validateLogin({ password, email }: { password: string; email: string }): Promise<UserType> {
  const user = await getRepository(User).findOne({ email });

  if (!user) {
    throw new Error('User not found.');
  }

  const isValid = await CryptoService.verify(password, user.password);

  if (!isValid) {
    throw new Error('Unauthorized. Invalid password');
  }

  return user;
}
