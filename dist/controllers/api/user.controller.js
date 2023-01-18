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
const Logging_1 = __importDefault(require("../../library/Logging"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../../models/User"));
const NAMESPACE = 'Auth';
class UserController {
}
_a = UserController;
UserController.index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.find()
        .select('-password')
        .exec()
        .then((users) => res.status(200).json({ users }))
        .catch((err) => res.status(500).json({ err }));
});
UserController.create = (req, res, next) => {
    const user = new User_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name
    });
    return user
        .save()
        .then((newUser) => res.status(201).json({ newUser }))
        .catch((err) => res.status(500).json({ err }));
};
UserController.show = (req, res, next) => {
    const userId = req.params.id;
    return User_1.default.findById(userId)
        .select('-__v -password')
        .exec()
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
        .catch((err) => res.status(500).json({ err }));
};
UserController.update = (req, res, next) => {
    const userId = req.params.id;
    return User_1.default.findById(userId)
        .select('-__v -password')
        .exec()
        .then((updatedUser) => {
        if (updatedUser) {
            updatedUser.set(req.body);
            return updatedUser
                .save()
                .then((newUser) => res.status(201).json({ newUser }))
                .catch((err) => res.status(500).json({ err }));
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    })
        .catch((err) => res.status(500).json({ err }));
};
UserController.delete = (req, res, next) => {
    const userId = req.params.id;
    return User_1.default.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'User not found' })))
        .catch((err) => res.status(500).json({ err }));
};
UserController.me = (req, res, next) => {
    Logging_1.default.info(`${NAMESPACE} : Get Me`);
    const userId = res.locals.jwt._id;
    Logging_1.default.info(`${NAMESPACE} : Get For ${userId}`);
    return User_1.default.findById(userId)
        .select('-__v -password')
        .exec()
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
        .catch((err) => res.status(500).json({ err }));
};
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map