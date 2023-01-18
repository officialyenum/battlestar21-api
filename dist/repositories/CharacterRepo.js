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
const Character_1 = __importDefault(require("../models/Character"));
const mongoose_1 = __importDefault(require("mongoose"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env file
class CharacterRepo {
    generateCharacterName() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(process.env.AI_TOKEN);
            const aiPrompt = {
                "prompt": "Generate a Character Fighter Name.\nName: Jao Gunner\n##\nGenerate a Character Fighter Name.\nName: Ken Yenum\n##\nGenerate a Character Fighter Name.\nName: Cobra Shinji\n##\nGenerate a Character Fighter Name.\nName:",
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
    generateCharacterBio(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const aiPrompt = {
                "prompt": `Write a character bio for a versus battle fighting game based on a list of features.\nName: Bo Kimmich\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio: Bo Kimmich is a Surgeon, He is a Karate Expert, His most remarkable talent is to heal from virtually any injury, He specializes in the Raikiri Technique, which allows him to conjure Electricity and hit his opponent\n\n##\n\nWrite a character bio for a versus battle fighting game based on a list of features.\nName: Lao Kung\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio: Lao Kung is a Monk, He is a Tai chi Master, His primary technique is to deal deadly blows to the opponent's heart, He specializes in the Summoning Technique, which allows him to call upon demons that causes hallucinations to his opponents\n\n##\n\nWrite a character bio for a versus battle fighting game based on a list of features.\nName: Star Killer\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio: Star Killer is Ex-Military, He is a Judo Expert, His primary technique is to hit his target with his sniper, He specializes in the Shadow Clone Technique, which allows him to make copies of himself expanding his shooting range.\n\n##\n\nWrite a character bio for a versus battle fighting game based on a list of features.\nName: ${name}\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio:`,
                "numResults": 1,
                "maxTokens": 240,
                "temperature": 1,
                "topKReturn": 0,
                "topP": 0.98,
                "countPenalty": {
                    "scale": 0,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "frequencyPenalty": {
                    "scale": 225,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "presencePenalty": {
                    "scale": 1.2,
                    "applyToNumbers": false,
                    "applyToPunctuations": false,
                    "applyToStopwords": false,
                    "applyToWhitespaces": false,
                    "applyToEmojis": false
                },
                "stopSequences": ["##"]
            };
            const res = yield axios_1.default.post('https://api.ai21.com/studio/v1/j1-jumbo/complete', aiPrompt, {
                headers: {
                    "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                    "Content-Type": "application/json"
                },
            });
            return res.data.completions[0].data.text;
        });
    }
    generateCharacter() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = yield this.generateCharacterName();
            const bio = yield this.generateCharacterBio(name.trim());
            const character = new Character_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: name.trim(),
                bio: bio.trim()
            });
            const savedCharacter = yield character.save();
            return savedCharacter;
        });
    }
    getRandomCharacter(random) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomUser = yield Character_1.default.findOne().skip(random).exec();
            return randomUser;
        });
    }
    getCharacterCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield Character_1.default.find({}).count();
            return count;
        });
    }
    generateTwoCharacters() {
        return __awaiter(this, void 0, void 0, function* () {
            const charOne = yield this.generateCharacter();
            const charTwo = yield this.generateCharacter();
            return {
                player: charOne,
                computer: charTwo
            };
        });
    }
}
exports.default = CharacterRepo;
//# sourceMappingURL=CharacterRepo.js.map