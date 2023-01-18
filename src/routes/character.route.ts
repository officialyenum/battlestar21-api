import { Router } from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import CharacterController from '../controllers/api/character.controller';

const router = Router();
const controller = new CharacterController();



// Character routes
router.get('/', controller.index);
router.get('/generate/name', controller.generateName);
router.patch('/:id', ValidateSchema(Schemas.character.update), controller.update);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);

export default router;
