import mongoose, { Document, Schema } from 'mongoose';
import Counter from "./Counter";

export interface IBattle {
    character_one: Schema.Types.ObjectId;
    character_two: Schema.Types.ObjectId;
    owner_id: Schema.Types.ObjectId;
    story:string
}

export interface IBattleModel extends Document, IBattle {}

const BattleSchema: Schema = new Schema(
    {
        characterOne: {
            type: Schema.Types.ObjectId,
            ref: 'Character'
        },
        characterTwo: {
            type: Schema.Types.ObjectId,
            ref: 'Character'
        },
        winner: {
            type: Schema.Types.ObjectId,
            ref: 'Character'
        },
        story: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Implementing Auto Increment
// BattleSchema.pre('save', function (next) {
//     const doc = this;
//     Counter.findOneAndUpdate(
//         {id:"autoval"},
//         {"$inc":{"seq":1}},
//         {new:true},(err:any, cb:any)=>{
//             let seqId;
//             if(cb==null){
//                 const newValue= new Counter({id:"battle",seq:1});
//                 newValue.save();
//                 seqId = 1;
//             }else{
//                 seqId = cb.seq
//             }
//             this.id = seqId;
//         }
//     );
// })


export default mongoose.model<IBattleModel>('Battle', BattleSchema);;
