import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Battle from '../../models/Battle';
import BattleRepo from '../../repositories/BattleRepo';
import dotenv from 'dotenv';
dotenv.config(); // load .env file

class BattleController {

    private repo;
    constructor(){
        this.repo = new BattleRepo();
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        return Battle.find()
            .select('-__v')
            .populate('author', '-__v -password')
            .exec()
            .then((battles) => res.status(200).json({ data: battles }))
            .catch((err) => res.status(500).json({ err }));
    };


    show = (req: Request, res: Response, next: NextFunction) => {
        const battleId = req.params.id;
        return Battle.findById(battleId)
            .select('-__v')
            .then((battle) => (battle ? res.status(200).json({ data: battle }) : res.status(404).json({ message: 'Battle not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    delete = (req: Request, res: Response, next: NextFunction) => {
        const battleId = req.params.id;
        return Battle.findByIdAndDelete(battleId)
            .then((battle) => (battle ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Battle not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    generateBattle = async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.repo.generateBattle();
        return res.status(200).json({
            data
        });
    };

}

export default BattleController;
