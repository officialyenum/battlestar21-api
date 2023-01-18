import Battle, { IBattle } from "../models/Battle";
import mongoose from 'mongoose';
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config(); // load .env file


class BattleRepo {

    async generateBattle() {
        console.log(process.env.AI_TOKEN);
    }

    async getBattleCount() {
        const count = await Battle.find({}).count();
        return count;
    }
}

export default BattleRepo;
