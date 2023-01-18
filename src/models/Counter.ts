import mongoose, { Document, Schema } from 'mongoose';

export interface ICounter {
    username: string;
    password: string;
}

export interface ICounterModel extends Document, ICounter {}

const CounterSchema: Schema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        seq: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<ICounterModel>('Counter', CounterSchema);
