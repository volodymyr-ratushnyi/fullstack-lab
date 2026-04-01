import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/application/dtos/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepository } from '../../domain/user.repository';
import { UserDocument, UserSchemaClass } from '../schemas/user.schema';

export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly model: Model<UserDocument>,
  ) {}

  public async create(user: CreateUserDto) {
    const data = UserMapper.toPersistence(user);

    // Upsert: update if exists, insert if not
    const doc = await this.model
      .findByIdAndUpdate(null, data, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      })
      .exec();

    return UserMapper.toDomain(doc);
  }

  public async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
  }
}
