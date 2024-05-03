import { model, Schema, Document, Model } from "mongoose";

export const DOCUMENT_NAME = "Invoice";
export const COLLECTION_NAME = "invoicess";


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

// model Invoice {
//     id             String        @id @default(uuid())
//     stripe         String        @unique
//     price          Int
//     currency       Currency
//     userId         String
//     subscriptionId String
//     status         InvoiceStatus @default(initiated)
//     isDeleted      Boolean?      @default(false)
//     createdAt      DateTime?     @default(now())
//     expiresAt      DateTime?     @default(now())
//     updatedAt      DateTime?     @updatedAt
//     subscription   Subscription  @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)
//     user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)
//   }


export default interface Invoice extends Document {
    stripe : String;
    price: String;
    currency: String;
    userId: String,
    subscriptionId: String,
    status: String,
    isDeleted : Boolean,
    createdAt: Date,
    expiresAt : Date,
    updatedAt: Date,
    subscription:String
   
   

}

const schema = new Schema(
    {

        stripe: {
            type: Schema.Types.String,
            required: true,
            trim: true,

        },
        price: {
            type: Schema.Types.String,
            required: true,
            trim: true,  
        }

    },

    {
        timestamps: true,
        versionKey: false,
    }
);

export const InvoiceModel = model<Invoice>(DOCUMENT_NAME, schema, COLLECTION_NAME);