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
        // EXTRACT QUERY
        const { page, count } = req.query;
        const query:any ={
            page : page || 1,
            count: count || 10
        };
        try {
            // GET TOTAL CHARACTERS
            totalItems = await Character.find({}).count();
            const queryPage: number = +query.page;
            const queryCount: number = +query.count;

            // GET PAGINATED CHARACTERS
            const  characters = await this.repo.getCharacters(queryPage, queryCount)
            return res.status(200).json({
                data: characters,
                currentPage: queryPage,
                hasNextPage: queryCount * queryPage < totalItems,
                hasPreviousPage: queryPage > 1,
                nextPage: queryPage + 1,
                previousPage: queryPage - 1,
                lastPage: Math.ceil(totalItems/ queryCount) });

        } catch (error:any) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }


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

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const characters = await this.repo.getCharacters(1,5);
        characters.forEach(async (character:any) => {
            await this.repo.deleteCharacterById(character._id);
        });
        return res.status(201).json({ message: 'deleted' })
    };

    getRandom = async (req: Request, res: Response, next: NextFunction) => {
        const { character_id } = req.params;
        console.log(character_id);
        // Get the count of all users
        let userIsSame:boolean = true;
        let randomUser:any = null;
        let count = 0;
        try {
            const characterCount = await this.repo.getCharacterCount();
            const random = Math.floor(Math.random() * characterCount);
            console.log(random);
            do {
                // Breaker condition to prevent infinite loop
                if(count > 5){
                    throw new Error("Error occured generating random character");
                }else{
                    count++;
                }
                randomUser = await this.repo.getRandomCharacter(random);
                // Make Both ID String
                const randomUserId = JSON.stringify(randomUser._id);
                const characterId = JSON.stringify(character_id);
                console.log(randomUserId);
                console.log(characterId);
                if (characterId !== randomUserId) {
                    userIsSame = false;
                }
            } while (userIsSame);

            return res.status(200).json({
                status:true,
                character_id,
                randomUser,
                extra: userIsSame,
                data: randomUser
            });
        } catch (error:any) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }

    }

    generateName = async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.repo.generateCharacter();
        return res.status(200).json({
            data
        });
    };

}

export default CharacterController;
