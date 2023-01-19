declare var require: any;
import Battle, { IBattle } from "../models/Battle";
import Character, { ICharacter } from "../models/Character";
import mongoose from 'mongoose';
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config(); // load .env file


class BattleRepo {

    async generateBattle(winnerModelBio:string, loserModelBio:string, stage:string) {
        const aiPrompt = {
            "prompt": `Generate a Summarized Story for a Game Versus Type battle fight scene between Fighter One and Fighter Two that takes place on a Stage and makes Fighter One victorious. \n\nFighter One: Champion is a Bodybuilder, He is a Martial Artist, His special technique is known as the Violence Bypass, which allows him to attack at high speeds, He specializes in Muscle Contraction, which compresses and elongates your muscles, increasing damage.\n\nFighter Two: Shadow Hunter is Police Special Forces, He is a Former Tiger Scout, His primary technique is to overwhelm his target in a blitz attack, He specializes in Dark Attack, which he can focus on to improve his combat skills. \n\nStage: Above a Frozen Lake in Alaska\n\n Story: The two fighters are standing on a frozen lake getting ready to go head to head, Shadow dashes at Champion to ensure he carries out his blitz attack and gains advantage on the bodybuilder, champion loses his balance and is taking heavy damage, he looks for an opening. to grab shadow, shadow evades slightly, while he shoots a dark attack from his fists at Champion. champion gets hit and is down on the floor, shadow rushes to finish him off, and champion catches him off guard, grabs shadows right hand, and compresses his muscles rendering his right hand useless, now he has the advantage, he activates his violent bypass, and charges full on at shadow, after taking a heavy attack to the chest, shadow drops to the ground Champion is Victorious.\n\n  ##  \n\nFighter One: Red Sonya is a Communist Recruit, She is a Tae Kwon Do expert, Her Special Weapon is a Rocket Launcher, Which allows her to fire missiles from her M16 model loaded on her back, She can be used against heavy enemy foot soldiers, She can also use this weapon against motorcycle riders. \n\nFighter Two: Balthazar D'Angelo is a Vampire from 200 Years Ago, He is an Escapist, His most remarkable feature is the ability to hide from the sun perfectly, He learned how to make the perfect disguise in one hundred years of darkness, He goes through training in Opulence, which gives him the ability to read the small details of human behavior. \n\n Stage: Underground Subway New York City \n\nStory: The Stage is set in the subways, and both fighters take their stance, now D'Angelo makes a quick dash at Sonya, this is the perfect stage for him as there is no sunlight to limit his movements, Sonya is on guard as she takes heed of D'Angelo ability to read behaviors, A slash oh shit!, Sonya is bleeding she has no clue how that happened, as D'Angelo sneaks up from behind for a follow-up attack Sonya placed her M16 behind and fires at him, this sends D'Angelo flying towards the train, he gets stuck as one of the rails pierced him, Sonya steps some meter back takes aim and finishes him with her Rocket Launcher. Sonya Wins  \n\n##\n\n Fighter One: Arus Blaze is a biker, He is a BMX expert, His most remarkable talent is to change into an anthropomorphic horse, He embodies the Power of the Wolf, which gives him incredible speed.   \n\nFighter Two: Wolfsbane Aral is a Viking, He is a Berserker, His primary technique are those involving his bare hands, He specializes in the Armored Hiden technique, which gives him great protection to his skin.\n\nStage: The Rat Hole\n\nStory: Arus Blaze is riding his motorcycle, he is speeding through the mountain roads, he hears some noises in the bushes, so he stops and investigates, he observes a wolf, and he quickly changes his form to a horse and attacks the wolf, the wolf is startled by this, manages to fight back, but Arus is faster, Arus charges him, and attacks the wolf's head, the wolf is injured, he rushes Arus and bites him, Arus dodges the attack and attacks the wolf's back, the wolf collapses to the ground, Arus quickly charges him and bites him, the wolf falls to the ground, Arus is victorious.\n\n##\n\nFighter One: ${winnerModelBio}.   \n\nFighter Two: ${loserModelBio} \n\nStage: ${stage}\n\nStory:`,
            "numResults": 1,
            "maxTokens": 200,
            "temperature": 0,
            "topKReturn": 0,
            "topP":1,
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
            "stopSequences":["##"]
          }

        const res = await axios.post('https://api.ai21.com/studio/v1/experimental/j1-grande-instruct/complete',aiPrompt,{
            headers: {
                "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                "Content-Type": "application/json"
            },
        });

        return res.data.completions[0].data.text;
    }

    async saveBattle(charOneId:string, charTwoId:string, winnerId:string, stage:string, story:string) {
        const battle = new Battle({
            _id: new mongoose.Types.ObjectId(),
            characterOne: charOneId,
            characterTwo: charTwoId,
            winner: winnerId,
            stage: stage.trim(),
            story:  story.trim(),
        });
        const savedBattle = await battle.save();
        return savedBattle;
    }

    async generateBattleStage() {
        const aiPrompt = {
            "prompt": "Generate a Gaming Location For Battle.\nName: New york Subway Underground\n##\nGenerate a Gaming Location For Battle.\nName: Men Bathroom\n##\nGenerate a Gaming Location For Battle.\nName: Shopping Mall \n##\nGenerate a Gaming Location For Battle.\nName: Under Bridge, Oshodi Lagos\n##\nGenerate a Gaming Location For Battle.\nName: Frozen Lake, Alaska\n##\nGenerate a Gaming Location For Battle.\nName:",
            "numResults": 1,
            "maxTokens": 200,
            "temperature": 0.7,
            "topKReturn": 0,
            "topP":1,
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
            "stopSequences":["##"]
        }

        const res = await axios.post('https://api.ai21.com/studio/v1/experimental/j1-grande-instruct/complete', aiPrompt, {
            headers: {
                "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                "Content-Type": "application/json"
            },
        });
        return res.data.completions[0].data.text;
    }

    async getBattleCount() {
        const count = await Battle.find({}).count();
        return count;
    }

    async getCharacterById(id:string){
        const char = await Character.findById(id)
        return char;
    }
}

export default BattleRepo;