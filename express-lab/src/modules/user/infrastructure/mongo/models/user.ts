import {model, Schema, type InferSchemaType} from 'mongoose'

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user'},
  createdAt: {type: Date, required: true},
  updatedAt: {type: Date, default: new Date()}
})

export const UserModel = model('User', userSchema)
export type UserType = InferSchemaType<typeof userSchema>
