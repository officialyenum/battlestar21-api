import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Character from '../../models/Character';
import CharacterRepo from '../../repositories/CharacterRepo';
import dotenv from 'dotenv';
dotenv.config(); // load .env file

class CharacterController {

    private repo;
    constructor(){
        this.repo = new CharacterRepo();
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        let totalItems:number;
        const { page, count } = req.query;
        const query:any ={
            page : page || 1,
            count: count || 10
        };

        totalItems = await Character.find({}).count();
        const queryPage: number = +query.page;
        const queryCount: number = +query.count;

        return Character.find()
            .sort({"wins": "desc","loss":"asc"})
            .skip((queryPage - 1)* queryCount)
            .limit(queryCount)
            .lean()
            .then((characters) => {
                res.status(200).json({
                    data: characters,
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
        const characterId = req.params.id;
        return Character.findById(characterId)
            .select('-__v')
            .then((post) => (post ? res.status(200).json({ post }) : res.status(404).json({ message: 'Post not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    update = (req: Request, res: Response, next: NextFunction) => {
        const characterId = req.params.id;
        return Character.findById(characterId)
            .then((updatedCharacter) => {
                if (updatedCharacter) {
                    updatedCharacter.set(req.body);
                    return updatedCharacter
                        .save()
                        .then((newCharacter) => res.status(201).json({ newCharacter }))
                        .catch((err) => res.status(500).json({ err }));
                } else {
                    return res.status(404).json({ message: 'Post not found' });
                }
            })
            .catch((err) => res.status(500).json({ err }));
    };

    delete = (req: Request, res: Response, next: NextFunction) => {
        const characterId = req.params.id;
        return Character.findByIdAndDelete(characterId)
            .then((character) => (character ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Character not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    getRandom = async (req: Request, res: Response, next: NextFunction) => {
        const { character_id } = req.params;
        console.log(character_id);
        // Get the count of all users
        const characterCount = await this.repo.getCharacterCount();
        const random = Math.floor(Math.random() * characterCount);
        const randomUser = await this.repo.getRandomCharacter(random);
        return res.status(200).json({
            data: randomUser
        });
    }

    generateName = async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.repo.generateCharacter();
        return res.status(200).json({
            data
        });
    };

}

export default CharacterController;
