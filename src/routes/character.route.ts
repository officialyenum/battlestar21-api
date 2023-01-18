import { Router } from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import CharacterController from '../controllers/api/character.controller';

const router = Router();

/** Set up your api routes here */

// Post routes
router.get('/', CharacterController.index);
router.post('/', ValidateSchema(Schemas.character.create), CharacterController.create);
router.patch('/:id', ValidateSchema(Schemas.character.update), CharacterController.update);
router.get('/:id', CharacterController.show);
router.delete('/:id', CharacterController.delete);

export default router;
