import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/domain/user.entity';
import { UserMongoMapper } from 'src/user/infrastructure/repositories/mongo/user-mongo.mapper';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserDocument, UserSchemaClass } from 'src/user/infrastructure/schemas/user.schema';
import { NotFoundException } from '@nestjs/common';

export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly model: Model<UserDocument>,
  ) {}

  public async create(user: User) {
    const data = UserMongoMapper.toPersistence(user);
    await this.model.create(data);
  }

  public async delete(id: string) {
    await this.model.findByIdAndDelete(id).exec();
  }

  public async update(id: string, user: Partial<User>) {
    const { acknowledged } = await this.model
      .updateOne({ id }, { $set: { ...user } })
      .exec();
    if (!acknowledged) {
      throw new NotFoundException('There is no user with that id');
    }
  }
}
