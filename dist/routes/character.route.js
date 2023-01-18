"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const character_controller_1 = __importDefault(require("../controllers/api/character.controller"));
const router = (0, express_1.Router)();
const controller = new character_controller_1.default();
// Character routes
router.get('/', controller.index);
router.get('/generate/name', controller.generateName);
router.patch('/:id', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.character.update), controller.update);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);
exports.default = router;
//# sourceMappingURL=character.route.js.map