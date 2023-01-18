"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const user_controller_1 = __importDefault(require("../controllers/api/user.controller"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = (0, express_1.Router)();
/** Set up your api routes here */
// User routes
router.get('/', user_controller_1.default.index);
router.post('/', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.user.create), user_controller_1.default.create);
router.patch('/:id', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.user.update), user_controller_1.default.update);
router.get('/:id', user_controller_1.default.show);
router.delete('/:id', user_controller_1.default.delete);
router.post('/me', extractJWT_1.default, user_controller_1.default.me);
exports.default = router;
//# sourceMappingURL=user.route.js.map