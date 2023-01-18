"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/api/auth.controller"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = (0, express_1.Router)();
/** Set up your api routes here */
// Auth routes
router.post('/validate', extractJWT_1.default, auth_controller_1.default.validateToken);
router.post('/login', auth_controller_1.default.login);
router.post('/register', auth_controller_1.default.register);
exports.default = router;
//# sourceMappingURL=auth.route.js.map