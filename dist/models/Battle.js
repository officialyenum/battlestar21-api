"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BattleSchema = new mongoose_1.Schema({
    characterOne: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Character'
    },
    characterTwo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Character'
    },
    winner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Character'
    },
    stage: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
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
exports.default = mongoose_1.default.model('Battle', BattleSchema);
;
//# sourceMappingURL=Battle.js.map