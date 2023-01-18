"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const battle_controller_1 = __importDefault(require("../controllers/api/battle.controller"));
const router = (0, express_1.Router)();
const controller = new battle_controller_1.default();
// Character routes
router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);
exports.default = router;
//# sourceMappingURL=battle.route.js.map