import mongoose, { Document, Schema } from 'mongoose';
export interface ICharacter {
    name: string;
    bio: string;
    owner_id: Schema.Types.ObjectId;
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
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICharacterModel>('Character', CharacterSchema);
