import * as bcrypt from 'bcryptjs';

export class PasswordService {

  async hashPassword(password: string): Promise<string>  {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  };

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

}