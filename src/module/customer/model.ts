import { model, Schema, Document, Model } from "mongoose";

export const DOCUMENT_NAME = "Customer";
export const COLLECTION_NAME = "customers";





export default interface Customer extends Document {
  userName: string,
  email: string,
  customerName:String,
  imageUrl:String
}

const schema = new Schema(
  {

    userName: {
      type: Schema.Types.String,
      trim: true,

    },

    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    customerName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },

  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const CustomerModel = model<Customer>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export class UserRepository {
  private userModel: Model<Customer>;

  constructor() {
    this.userModel = CustomerModel;
  }

  async create(user: Partial<Customer>): Promise<Customer> {
    return this.userModel.create(user);
  }

  async findOne(query: Record<string, any>): Promise<Customer| null> {
    return this.userModel.findOne(query).exec();
  }

  async findMany(): Promise<Customer[]> {
    return this.userModel.find().exec();
  }

  async findOneAndUpdate(query: Record<string, any>, update: Record<string, any>): Promise<Customer| null> {
    return this.userModel.findOneAndUpdate(query, update, { new: true }).exec();
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany({}).exec();
  }

  async deleteOne(query: Record<string, any>): Promise<void> {
    await this.userModel.deleteOne(query).exec();
  }
}