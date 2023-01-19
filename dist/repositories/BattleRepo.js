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
    generateBattle(winnerModelBio, loserModelBio, stage) {
        return __awaiter(this, void 0, void 0, function* () {
            const aiPrompt = {
                "prompt": `Generate a Summarized Story for a Game Versus Type battle fight scene between Fighter One and Fighter Two that takes place on a Stage and makes Fighter One victorious. \n\nFighter One: Champion is a Bodybuilder, He is a Martial Artist, His special technique is known as the Violence Bypass, which allows him to attack at high speeds, He specializes in Muscle Contraction, which compresses and elongates your muscles, increasing damage.\n\nFighter Two: Shadow Hunter is Police Special Forces, He is a Former Tiger Scout, His primary technique is to overwhelm his target in a blitz attack, He specializes in Dark Attack, which he can focus on to improve his combat skills. \n\nStage: Above a Frozen Lake in Alaska\n\n Story: The two fighters are standing on a frozen lake getting ready to go head to head, Shadow dashes at Champion to ensure he carries out his blitz attack and gains advantage on the bodybuilder, champion loses his balance and is taking heavy damage, he looks for an opening. to grab shadow, shadow evades slightly, while he shoots a dark attack from his fists at Champion. champion gets hit and is down on the floor, shadow rushes to finish him off, and champion catches him off guard, grabs shadows right hand, and compresses his muscles rendering his right hand useless, now he has the advantage, he activates his violent bypass, and charges full on at shadow, after taking a heavy attack to the chest, shadow drops to the ground Champion is Victorious.\n\n  ##  \n\nFighter One: Red Sonya is a Communist Recruit, She is a Tae Kwon Do expert, Her Special Weapon is a Rocket Launcher, Which allows her to fire missiles from her M16 model loaded on her back, She can be used against heavy enemy foot soldiers, She can also use this weapon against motorcycle riders. \n\nFighter Two: Balthazar D'Angelo is a Vampire from 200 Years Ago, He is an Escapist, His most remarkable feature is the ability to hide from the sun perfectly, He learned how to make the perfect disguise in one hundred years of darkness, He goes through training in Opulence, which gives him the ability to read the small details of human behavior. \n\n Stage: Underground Subway New York City \n\nStory: The Stage is set in the subways, and both fighters take their stance, now D'Angelo makes a quick dash at Sonya, this is the perfect stage for him as there is no sunlight to limit his movements, Sonya is on guard as she takes heed of D'Angelo ability to read behaviors, A slash oh shit!, Sonya is bleeding she has no clue how that happened, as D'Angelo sneaks up from behind for a follow-up attack Sonya placed her M16 behind and fires at him, this sends D'Angelo flying towards the train, he gets stuck as one of the rails pierced him, Sonya steps some meter back takes aim and finishes him with her Rocket Launcher. Sonya Wins  \n\n##\n\n Fighter One: Arus Blaze is a biker, He is a BMX expert, His most remarkable talent is to change into an anthropomorphic horse, He embodies the Power of the Wolf, which gives him incredible speed.   \n\nFighter Two: Wolfsbane Aral is a Viking, He is a Berserker, His primary technique are those involving his bare hands, He specializes in the Armored Hiden technique, which gives him great protection to his skin.\n\nStage: The Rat Hole\n\nStory: Arus Blaze is riding his motorcycle, he is speeding through the mountain roads, he hears some noises in the bushes, so he stops and investigates, he observes a wolf, and he quickly changes his form to a horse and attacks the wolf, the wolf is startled by this, manages to fight back, but Arus is faster, Arus charges him, and attacks the wolf's head, the wolf is injured, he rushes Arus and bites him, Arus dodges the attack and attacks the wolf's back, the wolf collapses to the ground, Arus quickly charges him and bites him, the wolf falls to the ground, Arus is victorious.\n\n##\n\nFighter One: Zeref Masamoto is An Omnipotent Mortal, He is an Esper, and His power is limitless, He specializes in the Territory Creation Magic of the Creation of Reality, This technique allows Zeref to create anything he imagines.   \n\nFighter Two: Lee Gunso is a Painter, He is a Kenjutsu Expert, He is a frequent user of switching umbrellas due to the fact that he only carries one weapon. He specializes in the Umbrella Projection Hindrance, which uses the same concepts as the Fog Curse but is not technically a Spell and only affects his attacker via physical weapons. \n\nStage: Meadow, England\n\nStory: The stage is set in a meadow, and the fighters are taking their stance, Zeref quickly dashes at Gunso, he quickly creates some clones of himself and attacks Gunso, the clones are quickly destroyed, now he creates some clones of himself again, and dashes again, Gunso tries to defend, but he is overwhelmed, Zerefactivates his Territory Creation Magic, and he creates some clones of himself, now he attacks Gunso and the clones, Gunso tries to defend, but he is overwhelmed, Zeref is victorious.\n\n## \n\nFighter One: Rika is a Wrestler, She is a Mixed martial art owner, and her specialty is to grab hold of her opponent and slam them to the ground, she owns Marahyst MMA.   \n\nFighter Two: Laurie Walker is an Ex Super Heroine, She is a Ninja expert, and her main move is to kill her enemy without them noticing, she specializes in the Hiding in the Light.\n\nStage: Sewers, Paris\n\nStory: The stage is set in some sewers, and the fighters are taking their stance, Rika makes a quick dash at Laurie, she jumps and grabs Laurie, and slams her to the ground, Laurie tries to defend herself, but she is overwhelmed, Rika wins.\n\n## \n\nFighter One: ${winnerModelBio}\n\nFighter Two: ${loserModelBio}\n\n\nStage: ${stage}\n\nStory:`,
                "numResults": 1,
                "maxTokens": 200,
                "temperature": 0.3,
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
    saveBattle(charOneId, charTwoId, winnerId, stage, story) {
        return __awaiter(this, void 0, void 0, function* () {
            const battle = new Battle_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                characterOne: charOneId,
                characterTwo: charTwoId,
                winner: winnerId,
                stage: stage.trim(),
                story: story.trim(),
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