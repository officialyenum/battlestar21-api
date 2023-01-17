import mongoose, { Document, Schema } from 'mongoose';

export interface ICharacter {
    title: string;
    author: string;
}

export interface ICharacterModel extends Document, ICharacter {}

const CharacterSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        bio: {
            type: String
        },
        primaryAttack: {
            type: String,
            required: true
        },
        secondaryAttack: {
            type: String,
            required: true
        },
        type: {
            type: Enumerator,
            required: true
        },
        owner_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICharacterModel>('Character', CharacterSchema);
