import { User } from 'src/user/domain/user.entity';

export abstract class UserRepository {
  abstract create: (userData: User) => Promise<void>;
  abstract delete: (id: string) => void;
  abstract update: (id: string, userData: Partial<User>) => void;
}
