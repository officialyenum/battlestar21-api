import { Router } from 'express';
// import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import CharacterController from '../controllers/api/character.controller';

const router = Router();
const controller = new CharacterController();



// Character routes
router.get('/', controller.index);
router.get('/generate', controller.generateName);
router.get('/:id', controller.show);
// router.delete('/:id', controller.delete);
router.get('/random/:character_id', controller.getRandom);

export default router;
