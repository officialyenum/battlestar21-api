"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
const character_controller_1 = __importDefault(require("../controllers/api/character.controller"));
const router = (0, express_1.Router)();
const controller = new character_controller_1.default();
// Character routes
router.get('/', controller.index);
router.get('/generate', controller.generateName);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);
router.get('/random/:character_id', controller.getRandom);
exports.default = router;
//# sourceMappingURL=character.route.js.map