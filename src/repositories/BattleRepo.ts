import Character, { ICharacter } from "../models/Character";
import mongoose from 'mongoose';
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config(); // load .env file


class BattleRepo {

    async generateBattle() {
        console.log(process.env.AI_TOKEN);
    }
}

export default BattleRepo;
