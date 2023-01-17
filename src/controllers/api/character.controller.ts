import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Character from '../../models/Character';

class CharacterController {
    public static index = async (req: Request, res: Response, next: NextFunction) => {
        return Character.find()
            .select('-__v')
            .populate('author', '-__v -password')
            .exec()
            .then((characters) => res.status(200).json({ data: characters }))
            .catch((err) => res.status(500).json({ err }));
    };

    public static create = (req: Request, res: Response, next: NextFunction) => {
        const character = new Character({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            author: req.body.author
        });
        return character
            .save()
            .then((newCharacter) => res.status(201).json({ data: newCharacter }))
            .catch((err) => res.status(500).json({ err }));
    };

    public static show = (req: Request, res: Response, next: NextFunction) => {
        const characterId = req.params.id;
        return Character.findById(characterId)
            .select('-__v')
            .populate('author', '-__v -password')
            .exec()
            .then((post) => (post ? res.status(200).json({ post }) : res.status(404).json({ message: 'Post not found' })))
            .catch((err) => res.status(500).json({ err }));
    };

    public static update = (req: Request, res: Response, next: NextFunction) => {
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

    public static delete = (req: Request, res: Response, next: NextFunction) => {
        const characterId = req.params.id;
        return Character.findByIdAndDelete(characterId)
            .then((character) => (character ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Character not found' })))
            .catch((err) => res.status(500).json({ err }));
    };
}

export default CharacterController;
