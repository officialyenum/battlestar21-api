"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Logging_1 = __importDefault(require("../../library/Logging"));
const signJWT_1 = __importDefault(require("../../services/signJWT"));
const User_1 = __importDefault(require("../../models/User"));
const NAMESPACE = 'Auth';
class AuthController {
}
_a = AuthController;
AuthController.validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Logging_1.default.info(`${NAMESPACE} : Token validated, User Authorized`);
    return res.status(200).json({ message: 'Token is valid' });
});
AuthController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    User_1.default.find({ username })
        .exec()
        .then((users) => {
        if (users.length !== 1) {
            Logging_1.default.error(`${NAMESPACE} : Logged in User Not found in Database`);
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        Logging_1.default.info(`${NAMESPACE} : Logged in : ${users}`);
        bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
            if (error) {
                Logging_1.default.error(`${NAMESPACE} : Password mismatch - ${error.message} : ${error}`);
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            else if (result) {
                (0, signJWT_1.default)(users[0], (_error, token) => {
                    if (_error) {
                        Logging_1.default.error(`${NAMESPACE} : Unable to sign token : ${_error}`);
                        return res.status(401).json({
                            message: 'Unauthorized',
                            error: _error
                        });
                    }
                    else if (token) {
                        return res.status(201).json({
                            message: 'Authenticated Successfully',
                            token,
                            user: users[0]
                        });
                    }
                });
            }
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
AuthController.register = (req, res, next) => {
    const { username, password } = req.body;
    bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        const _user = new User_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            username,
            password: hash
        });
        return _user
            .save()
            .then((data) => {
            (0, signJWT_1.default)(data, (_error, token) => {
                if (_error) {
                    Logging_1.default.error(`${NAMESPACE} : Unable to sign token : ${_error}`);
                    return res.status(401).json({
                        message: 'Unauthorized',
                        error: _error
                    });
                }
                else if (token) {
                    return res.status(201).json({
                        message: 'Registered Successfully',
                        token,
                        user: data
                    });
                }
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    });
};
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map