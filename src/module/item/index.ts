import { model, Schema, Document, Model } from "mongoose";

export const DOCUMENT_NAME = "tutorial";
export const COLLECTION_NAME = "Tutorials";


export default interface Category extends Document {
  name: string;
  description?: string;
  userId: Schema.Types.ObjectId;
}

const schema = new Schema(
  {

    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,

    },
    description: {
      type: Schema.Types.String,
      required: true,
      trim: true,

      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    }

  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoryModel = model<Category>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export class CategoryRepository {
  private categoryModel: Model<Category>;

  constructor() {
    this.categoryModel = CategoryModel;
  }

  async create(user: Partial<Category>): Promise<Category> {
    return this.categoryModel.create(user);
  }

  async findOne(query: Record<string, any>): Promise<Category| null> {
    return this.categoryModel.findOne(query).exec();
  }

  async findMany(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOneAndUpdate(query: Record<string, any>, update: Record<string, any>): Promise<Category | null> {
    return this.categoryModel.findOneAndUpdate(query, update, { new: true }).exec();
  }

  async deleteAll(): Promise<void> {
    await this.categoryModel.deleteMany({}).exec();
  }

  async deleteOne(query: Record<string, any>): Promise<void> {
    await this.categoryModel.deleteOne(query).exec();
  }
}