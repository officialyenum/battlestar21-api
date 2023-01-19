import { Router } from 'express';
import BattleController from '../controllers/api/battle.controller';

const router = Router();
const controller = new BattleController();



// Character routes
router.get('/', controller.index);
router.post('/simulate', controller.generateBattle);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);

export default router;
