import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserMongoMapper } from 'src/user/infrastructure/repositories/mongo/user-mongo.mapper';
import { UserReadRepository } from 'src/user/domain/user-read.repository';
import { UserDocument, UserSchemaClass } from '../../schemas/user.schema';


@Injectable()
export class UserMongoReadRepository implements UserReadRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly model: Model<UserDocument>,
  ) {}

  async findByEmailOrUsername(usernameOrEmail: string) {
    const doc = await this.model.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    return doc ? UserMongoMapper.toDomain(doc) : null;
  }

  async findById(id: string) {
    const doc = await this.model.findById(id).lean().exec();
    return doc ? UserMongoMapper.toDomain(doc) : null;
  }

  async findAll() {
    const docs = await this.model
      .find()
      .select(
        '_id firstName lastName username email role isVerified createdAt updatedAt',
      )
      .lean()
      .exec();
    return docs.map(UserMongoMapper.toDomain);
  }
}
