import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Character from '../models/Character';

class CharacterRepo {
    public character = new Character();
    
    generateName() {
        
    }

    generatePrimaryAttack($name: String) {
        
    }

    generateSecondaryAttack($name: String) {
        
    }

    generateBio($name: String) {
        
    }
}

export default CharacterRepo;
