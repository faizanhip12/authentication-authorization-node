import { model, Schema, Document, Model } from "mongoose";

export const DOCUMENT_NAME = "tutorial";
export const COLLECTION_NAME = "Tutorials";


export default interface Tutorial extends Document {
    title: string;
    description?: string;
    published: boolean;
}

const schema = new Schema(
    {

        title: {
            type: Schema.Types.String,
            required: true,
            trim: true,

        },
        description: {
            type: Schema.Types.String,
            required: true,
            trim: true,

            published: {
                type: Schema.Types.Boolean,
                ref: 'User',
                required: true,
            },
            // image: {
            //     type: Schema.Types.Boolean,
            //     ref: 'User',
            //     required: true,
            // }
        }

    },

    {
        timestamps: true,
        versionKey: false,
    }
);

export const TutorialModel = model<Tutorial>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export class TutorialRepository {
private titorialModel: Model<Tutorial>;
// titorialModel: any

    constructor() {
        this.titorialModel = TutorialModel;
    }

  async create(tutorial: Partial<Tutorial>): Promise<Tutorial> {
        console.log("tutorialtutorialtutorial",tutorial)
        return  this.titorialModel.create(tutorial)
    }

    async findOne(query: Record<string, any>): Promise<Tutorial| null> {
        return this.titorialModel.findOne(query).exec();
    }

   async findMany(): Promise<Tutorial[]> {
        return this.titorialModel.find().exec();
    }

    async findOneAndUpdate(query: Record<string, any>, update: Record<string, any>): Promise<Tutorial | null> {
        return this.titorialModel.findOneAndUpdate(query, update, { new: true }).exec();
    }

    // static async deleteAll(): Promise<void> {
    //     await this.titorialModel.deleteMany({}).exec();
    // }

    // static async deleteOne(query: Record<string, any>): Promise<void> {
    //     await this.titorialModel.deleteOne(query).exec();
    // }
}