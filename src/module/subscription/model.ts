import { model, Schema, Document, Model } from "mongoose";

export const DOCUMENT_NAME = "Subscription";
export const COLLECTION_NAME = "subscriptions";


// model Subscription {
//     id          String @id @default(uuid())
//     title       String
//     subTitle    String
//     description String

//     expireYears  Int
//     expireMonths Int
//     expireDays   Int

//     type SubscriptionType? @default(PRE_DEFINED)

//     logo String @default("https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/demo-4/images/pages/pricing-illustration-2.png")

//     price       Int
//     actualPrice Int

//     createdBy User   @relation(fields: [userId], references: [id], onDelete: Cascade)
//     userId    String

//     // meta
//     isDeleted Boolean?  @default(false)
//     createdAt DateTime? @default(now())
//     updatedAt DateTime? @updatedAt
//     invoices  Invoice[]
//   }


export default interface Subscription extends Document {
    title: string;
    subTitle?: string;
    description: String;
    expireYears: String,
    expireMonths: String,
    expireDays: String,
    paymentType: string,
    logo: String,
    price: String,
    actualPrice: String,
    createdBy: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,

}

const schema = new Schema(
    {

        title: {
            type: Schema.Types.String,
            required: true,
            trim: true,

        },
        subTitle: {
            type: Schema.Types.String,
            required: true,
            trim: true,

            description: {
                type: Schema.Types.String,
                required: true,

            },
            expireYears: {
                type: Schema.Types.String,
                required: true,

            },
            expireMonths: {
                type: Schema.Types.String,
                required: true,

            },
            expireDays: {
                type: Schema.Types.String,
                required: true,

            },
            paymentType: {
                type: Schema.Types.String,
                required: true,

            },
            logo: {
                type: Schema.Types.String,
                required: true,

            },
            price: {
                type: Schema.Types.String,
                required: true,

            },
            actualPrice: {
                type: Schema.Types.String,
                required: true,

            },
            createdBy: {
                type: Schema.Types.String,
                required: true,

            },
            isDeleted: {
                type: Schema.Types.Boolean,
                required: true,

            },
            createdAt: {
                type: Schema.Types.String,
                required: true,

            },
            updatedAt: {
                type: Schema.Types.String,
                required: true,

            },
        }

    },

    {
        timestamps: true,
        versionKey: false,
    }
);

export const SubscriptionModel = model<Subscription>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export class SubscriptionRepository {
    private subscriptionModel: Model<Subscription>;

    constructor() {
        this.subscriptionModel = SubscriptionModel;
    }

    async create(user: Partial<Subscription>): Promise<Subscription> {
        return this.subscriptionModel.create(user);
    }

    async findOne(query: Record<string, any>): Promise<Subscription | null> {
        return this.subscriptionModel.findOne(query).exec();
    }

    async findMany(): Promise<Subscription[]> {
        return this.subscriptionModel.find().exec();
    }

    async findOneAndUpdate(query: Record<string, any>, update: Record<string, any>): Promise<Subscription | null> {
        return this.subscriptionModel.findOneAndUpdate(query, update, { new: true }).exec();
    }

    async deleteAll(): Promise<void> {
        await this.subscriptionModel.deleteMany({}).exec();
    }

    async deleteOne(query: Record<string, any>): Promise<void> {
        await this.subscriptionModel.deleteOne(query).exec();
    }
}