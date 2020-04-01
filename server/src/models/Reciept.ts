import mongoose, {Schema} from 'mongoose';

export type RecieptDocument = mongoose.Document & {
    name: string;
    thumbnail: string;
    category: string;
    complexity: number;
    time: string;
    description: string;
    ingredients: {
        ingredient: Ingredient;
        amount: number;
    };
    steps: [{
        picture: string;
        description: string;
    }];
};

const recieptSchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    category: [String],
    complexity: Number,
    time: String,
    description: String,
    ingredients: {
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
        },
        amount: Number,
    },
    steps: [{
        picture: String,
        description: String,
    }],
}, {timestamps: true});


export const Reciept = mongoose.model<RecieptDocument>('Reciept', recieptSchema);
