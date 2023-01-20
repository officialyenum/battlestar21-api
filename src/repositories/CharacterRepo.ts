import Character, { ICharacter, ICharacterModel } from "../models/Character";
import mongoose from 'mongoose';
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config(); // load .env file


class CharacterRepo {

    async generateCharacterName() {
        console.log(process.env.AI_TOKEN);
        const aiPrompt = {
            "prompt": "Generate a Character Fighter Name.\nName: Jao Gunner\n##\nGenerate a Character Fighter Name.\nName: Ken Yenum\n##\nGenerate a Character Fighter Name.\nName: Cobra Shinji\n##\nGenerate a Character Fighter Name.\nName:",
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

    async  generateCharacterBio(name: string){

        const aiPrompt = {
            "prompt": `Write a character bio for a versus battle fighting game based on a list of features.\nName: Bo Kimmich\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio: Bo Kimmich is a Surgeon, He is a Karate Expert, His most remarkable talent is to heal from virtually any injury, He specializes in the Raikiri Technique, which allows him to conjure Electricity and hit his opponent\n\n##\n\nWrite a character bio for a versus battle fighting game based on a list of features.\nName: Lao Kung\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio: Lao Kung is a Monk, He is a Tai chi Master, His primary technique is to deal deadly blows to the opponent's heart, He specializes in the Summoning Technique, which allows him to call upon demons that causes hallucinations to his opponents\n\n##\n\nWrite a character bio for a versus battle fighting game based on a list of features.\nName: Star Killer\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio: Star Killer is Ex-Military, He is a Judo Expert, His primary technique is to hit his target with his sniper, He specializes in the Shadow Clone Technique, which allows him to make copies of himself expanding his shooting range.\n\n##\n\nWrite a character bio for a versus battle fighting game based on a list of features.\nName: ${name}\nFeatures:\n- Name\n- Hand To Hand Combat\n- Primary Skill\n- Special Skill\nBio:`,
            "numResults": 1,
            "maxTokens": 240,
            "temperature": 1,
            "topKReturn": 0,
            "topP":0.98,
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
            "stopSequences":["##"]
            }

        const res = await axios.post('https://api.ai21.com/studio/v1/j1-jumbo/complete', aiPrompt, {
            headers: {
                "Authorization": `Bearer ${process.env.AI_TOKEN}`,
                "Content-Type": "application/json"
            },
        });
        return res.data.completions[0].data.text;
    }

    async generateCharacter() {
        const name = await this.generateCharacterName();
        const bio = await this.generateCharacterBio(name.trim());
        const character = new Character({
            _id: new mongoose.Types.ObjectId(),
            name: name.trim(),
            bio: bio.trim()
        });
        const savedCharacter = await character.save();
        return savedCharacter;
    }

    async getRandomCharacter(random:number) {
        const randomUser = await Character.findOne().skip(random).exec();
        return randomUser;
    }

    async getCharacters(queryPage:number, queryCount:number) {
        const characters = await Character.find().sort({"wins": "desc","loss":"desc"})
                                .skip((queryPage - 1)* queryCount)
                                .limit(queryCount)
                                .lean();
        return characters;
    }

    async getCharacterCount() {
        const count = await Character.find({}).count();
        return count;
    }

    async generateTwoCharacters() {
        const charOne = await this.generateCharacter();
        const charTwo = await this.generateCharacter();
        return {
            player:charOne,
            computer:charTwo
        }
    }

    async getCharacterById(id:string){
        const char =await Character.findById(id)
        return char;
    }

    async deleteCharacterById(id:string){
        await Character.findByIdAndDelete(id);
    }

    async updateCharacterLoss(id:string){
        await Character.findOneAndUpdate({_id: id}, { $inc: {'loss': 1 } },{new:true});
    }

    async updateCharacterWin(id:string){
        await Character.findOneAndUpdate({_id: id}, { $inc: { 'wins' : 1 } },{new:true});
    }
}


export default CharacterRepo;
