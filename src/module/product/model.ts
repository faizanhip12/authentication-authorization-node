import { model, Schema, Document, Model } from "mongoose";

export const DOCUMENT_NAME = "Product";
export const COLLECTION_NAME = "products";



interface Product {
  name: string;
  description: string;
  categoryId: string; // Assuming categoryId is associated with products
  userId: string; // Assuming userId is associated with products
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

    },
    categoryId: {
      type: Schema.Types.String,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
      required: true,
    },
    quantity:{
      type: Schema.Types.String,
      required: true,
    }
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model<Product>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export class ProductRepository {
  private productModel: Model<Product>;

  constructor() {
    this.productModel = ProductModel
  }

  async create(user: Partial<Product>): Promise<Product> {
    return this.productModel.create(user);
  }

  async findOne(query: Record<string, any>): Promise<Product | null> {
    return this.productModel.findOne(query).exec();
  }

  async findMany(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOneAndUpdate(query: Record<string, any>, update: Record<string, any>): Promise<Product | null> {
    return this.productModel.findOneAndUpdate(query, update, { new: true }).exec();
  }

  async deleteAll(): Promise<void> {
    await this.productModel.deleteMany({}).exec();
  }

  async deleteOne(query: Record<string, any>): Promise<void> {
    await this.productModel.deleteOne(query).exec();
  }
}