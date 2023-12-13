import { model, Schema, Document,Model } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";


enum Roles{
    ADMIN="ADMIN",
    USER ="USER"
}



export default interface User extends Document {
    username:string,
    password:string
  }
  
  const schema = new Schema(
    {
    
      username: {
        type: Schema.Types.String,
        required: true,
        trim: true,
  
      },
      password: {
        type: Schema.Types.String,
        required: true,
        trim: true,
  
      },
      role: {
        type: Schema.Types.String,
        required: true,
        default:Roles.ADMIN,
        trim: true,
  
      },

    },
  
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
  export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

  export class UserRepository {
    private userModel: Model<User>;
  
    constructor() {
      this.userModel = UserModel;
    }
  
    async create(user: Partial<User>): Promise<User> {
      return this.userModel.create(user);
    }
  
    async findOne(query: Record<string, any>): Promise<User| null> {
      return this.userModel.findOne(query).exec();
    }
  
    async findMany(query: Record<string, any>): Promise<User[]> {
      return this.userModel.find(query).exec();
    }
  
    async findOneAndUpdate(query: Record<string, any>, update: Record<string, any>): Promise<User | null> {
      return this.userModel.findOneAndUpdate(query, update, { new: true }).exec();
    }
  
    async deleteAll(): Promise<void> {
      await this.userModel.deleteMany({}).exec();
    }
  
    async deleteOne(query: Record<string, any>): Promise<void> {
      await this.userModel.deleteOne(query).exec();
    }
  }