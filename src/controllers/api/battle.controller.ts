import { Request, Response, NextFunction } from 'express';
import Battle from '../../models/Battle';
import BattleRepo from '../../repositories/BattleRepo';
import CharacterRepo from '../../repositories/CharacterRepo';
import dotenv from 'dotenv';
import Character from '../../models/Character';
dotenv.config(); // load .env file

class BattleController {

    private repo;
    private characterRepo;
    constructor(){
        this.repo = new BattleRepo();
        this.characterRepo = new CharacterRepo();
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        let totalItems:number;
        const { page, count } = req.query;
        const query:any ={
            page : page || 1,
            count: count || 10
        };

        totalItems = await this.repo.getBattleCount();
        const queryPage: number = +query.page;
        const queryCount: number = +query.count;

        return Battle.find()
            .sort({"createdAt": "desc"})
            .skip((queryPage - 1)* queryCount)
            .limit(queryCount)
            .lean()
            .populate("characterOne")
            .populate("characterTwo")
            .populate("winner")
            .then((battles) => {
                res.status(200).json({
                    data: battles,
                    currentPage: queryPage,
                    hasNextPage: queryCount * queryPage < totalItems,
                    hasPreviousPage: queryPage > 1,
                    nextPage: queryPage + 1,
                    previousPage: queryPage - 1,
                    lastPage: Math.ceil(totalItems/ queryCount) })
            })
            .catch((err) => res.status(500).json({ err }));
    };


    show = (req: Request, res: Response, next: NextFunction) => {
        const battleId = req.params.id;
        return Battle.findById(battleId)
            .populate("characterOne")
            .populate("characterTwo")
            .populate("winner")
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
        const { characterOneId, characterTwoId } = req.body;
        if(characterOneId === characterTwoId){
            return res.status(422).json({
                status: false,
                message:"Characters cannot Battle themselves"
            });
        }
        const playerOne = await this.characterRepo.getCharacterById(characterOneId);
        const playerTwo = await this.characterRepo.getCharacterById(characterTwoId);
        // Get RNG to Pick winner
        const randomNum = Math.round(Math.random() * 1);
        // Generate Battle Stage
        const stage = await this.repo.generateBattleStage();
        // Confirm if Both players Exists
        if (!playerOne || !playerTwo) {
            return res.status(422).json({
                status: false,
                message:"players not specified"
            });
        }
        // Get Winner
        const winnerModel = randomNum === 1 ? playerTwo : playerOne;
        // Get Loser
        const loserModel = randomNum !== 1 ? playerTwo : playerOne;
        // Get Story By Generating Battle
        const story = await this.repo.generateBattle(winnerModel.bio, loserModel.bio, stage);
        // Save Battle Record;
        const data = await this.repo.saveBattle(playerOne._id, playerTwo._id, winnerModel._id, stage, story);
        // Update Characters win and Loss
        await this.characterRepo.updateCharacterLoss(loserModel._id);
        await this.characterRepo.updateCharacterWin(winnerModel._id);
        return Battle.findById(data._id)
                .populate("characterOne")
                .populate("characterTwo")
                .populate("winner")
                .then((battle) => (battle ? res.status(200).json({ data: battle }) : res.status(404).json({ message: 'Battle not found' })))
                .catch((err) => res.status(500).json({ err }));
    };

}

export default BattleController;
