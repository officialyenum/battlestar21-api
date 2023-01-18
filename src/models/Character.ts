import mongoose, { Document, Schema, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
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
        wins: {
            type: Number,
            default:0
        },
        loss: {
            type:Number,
            default:0
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

// paginate with this plugin
CharacterSchema.plugin(paginate);

// create the paginated model
export default mongoose.model<ICharacterModel>('Character', CharacterSchema);
