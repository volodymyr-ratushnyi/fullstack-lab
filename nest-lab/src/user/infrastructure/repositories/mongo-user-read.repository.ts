import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserMapper } from '../mappers/user.mapper';
import { UserReadRepository } from '../../domain/user-read.repository';
import { UserDocument, UserSchemaClass } from '../schemas/user.schema';


@Injectable()
export class MongoUserReadRepository implements UserReadRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly model: Model<UserDocument>,
  ) {}

  async findByUsernameOrEmail(usernameOrEmail: string) {
    const doc = await this.model.findOne({
      $or: [{ email: usernameOrEmail }, { userName: usernameOrEmail }],
    });
    return doc ? UserMapper.toDomain(doc) : null
  }

  async findByEmail(email: string) {
    const doc = await this.model.findOne({ email }).exec()
    return doc ? UserMapper.toDomain(doc) : null
  }

  async findById(id: string) {
    const doc = await this.model.findById(id).lean().exec();
    return doc ? UserMapper.toDomain(doc) : null;
  };

  async findAll() {
    const docs = await this.model
      .find()
      .select('_id firstName lastName userName email role isVerified createdAt updatedAt')
      .lean()
      .exec();
    return docs.map(UserMapper.toDomain);
  }
}
