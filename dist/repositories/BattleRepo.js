"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Battle_1 = __importDefault(require("../models/Battle"));
const Character_1 = __importDefault(require("../models/Character"));
const mongoose_1 = __importDefault(require("mongoose"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env file
class BattleRepo {
    generateBattle(playerOneBio, playerTwoBio, winner, stage) {
        return __awaiter(this, void 0, void 0, function* () {
            const aiPrompt = {
                "prompt": `Write a short versus battle-fight scene story based on the features. \nFeatures: \n- Fighter One: Shadow Hunter is Police Special Forces, He is a Former Tiger Scout, His primary technique is to overwhelm his target in a blitz attack, He specializes in Dark Attack, which he can focus on to improve his combat skills. \n- Fighter Two: Champion is a Bodybuilder, He is a Martial Artist, His special technique is known as the Violence Bypass, which allows him to attack at high speeds, He specializes in Muscle Contraction, which compresses and elongates your muscles, increasing damage.\n - Winner: Fighter Two \n- Stage: Above a Frozen Lake in Alaska\n Narrate: The two fighters are standing on a frozen lake getting ready to go head to head, Shadow dashes at Champion to ensure he carries out his blitz attack and gains advantage on the bodybuilder, champion loses his balance and is taking heavy damage, he looks for an opening. to grab shadow, shadow evades slightly, while he shoots a dark attack from his fists at Champion. champion gets hit and is down on the floor, shadow rushes to finish him off, and champion catches him off guard, grabs shadows right hand, and compresses his muscles rendering his right hand useless, now he has the advantage, he activates his violent bypass, and charges full on at shadow, after taking a heavy attack to the chest, shadow drops to the ground Champion is Victorious.\n\n  ##  \n\nWrite a short versus battle-fight scene story based on the features. \nFeatures: \n- Fighter One: Balthazar D'Angelo is a Vampire from 200 Years Ago, He is an Escapist, His most remarkable feature is the ability to hide from the sun perfectly, He learned how to make the perfect disguise in one hundred years of darkness, He goes through training in Opulence, which gives him the ability to read the small details of human behavior. \n\n- Fighter Two: Red Sonya is a Communist Recruit, She is a Tae Kwon Do expert, Her Special Weapon is a Rocket Launcher, Which allows her to fire missiles from her M16 model loaded on her back, She can be used against heavy enemy foot soldiers, She can also use this weapon against motorcycle riders. \n\n- Winner: Fighter Two\n - Stage: Underground Subway New York City \nNarrate: The Stage is set in the subways, and both fighters take their stance, now D'Angelo makes a quick dash at Sonya, this is the perfect stage for him as there is no sunlight to limit his movements, Sonya is on guard as she takes heed of D'Angelo ability to read behaviors, A slash oh shit!, Sonya is bleeding she has no clue how that happened, as D'Angelo sneaks up from behind for a follow-up attack Sonya placed her M16 behind and fires at him, this sends D'Angelo flying towards the train, he gets stuck as one of the rails pierced him, Sonya steps some meter back takes aim and finishes him with her Rocket Launcher. Sonya Wins  \n\n##\n\n  Write a short versus battle-fight scene story based on the features.\n Features:\n - Fighter One: ${playerOneBio}\n - Fighter Two: ${playerTwoBio} \n- Winner: ${winner} \n- Stage: ${stage} \nNarrate:`,
                "numResults": 1,
                "maxTokens": 200,
                "temperature": 0.7,
                "topKReturn": 0,
                "topP": 1,
                "countPenalty": {
                    "scale": 0,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "frequencyPenalty": {
                    "scale": 0,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "presencePenalty": {
                    "scale": 0,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "stopSequences": ["##"]
            };
            const res = yield axios_1.default.post('https://api.ai21.com/studio/v1/j1-large/complete', aiPrompt, {
                headers: {
                    "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                    "Content-Type": "application/json"
                },
            });
            return res.data.completions[0].data.text;
        });
    }
    saveBattle(charOneId, charTwoId, winnerId, story) {
        return __awaiter(this, void 0, void 0, function* () {
            const battle = new Battle_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                characterOne: charOneId,
                characterTwo: charTwoId,
                winner: winnerId,
                story,
            });
            const savedBattle = yield battle.save();
            return savedBattle;
        });
    }
    generateBattleStage() {
        return __awaiter(this, void 0, void 0, function* () {
            const aiPrompt = {
                "prompt": "Generate a Gaming Location For Battle.\nName: New york Subway Underground\n##\nGenerate a Gaming Location For Battle.\nName: Men Bathroom\n##\nGenerate a Gaming Location For Battle.\nName: Shopping Mall \n##\nGenerate a Gaming Location For Battle.\nName: Under Bridge, Oshodi Lagos\n##\nGenerate a Gaming Location For Battle.\nName: Frozen Lake, Alaska\n##\nGenerate a Gaming Location For Battle.\nName:",
                "numResults": 1,
                "maxTokens": 200,
                "temperature": 0.7,
                "topKReturn": 0,
                "topP": 1,
                "countPenalty": {
                    "scale": 0,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "frequencyPenalty": {
                    "scale": 0,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "presencePenalty": {
                    "scale": 0,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "stopSequences": ["##"]
            };
            const res = yield axios_1.default.post('https://api.ai21.com/studio/v1/experimental/j1-grande-instruct/complete', aiPrompt, {
                headers: {
                    "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                    "Content-Type": "application/json"
                },
            });
            return res.data.completions[0].data.text;
        });
    }
    getBattleCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield Battle_1.default.find({}).count();
            return count;
        });
    }
    getCharacterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const char = yield Character_1.default.findById(id);
            return char;
        });
    }
}
exports.default = BattleRepo;
//# sourceMappingURL=BattleRepo.js.map