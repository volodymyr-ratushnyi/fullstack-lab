import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/domain/user.entity';
import { UserMongoMapper } from 'src/user/infrastructure/repositories/mongo/user-mongo.mapper';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserDocument, UserSchemaClass } from 'src/user/infrastructure/schemas/user.schema';

export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly model: Model<UserDocument>,
  ) {}

  public async create(user: User) {
    const data = UserMongoMapper.toPersistence(user);

    // Upsert: update if exists, insert if not
    const doc = await this.model
      .findByIdAndUpdate(null, data, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      })
      .exec();

    return UserMongoMapper.toDomain(doc);
  }

  public async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
  }
}
