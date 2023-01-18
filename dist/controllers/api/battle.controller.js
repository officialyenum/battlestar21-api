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
Object.defineProperty(exports, "__esModule", { value: true });
const Battle_1 = __importDefault(require("../../models/Battle"));
const BattleRepo_1 = __importDefault(require("../../repositories/BattleRepo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env file
class BattleController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return Battle_1.default.find()
                .select('-__v')
                .populate('author', '-__v -password')
                .exec()
                .then((battles) => res.status(200).json({ data: battles }))
                .catch((err) => res.status(500).json({ err }));
        });
        this.show = (req, res, next) => {
            const battleId = req.params.id;
            return Battle_1.default.findById(battleId)
                .select('-__v')
                .then((battle) => (battle ? res.status(200).json({ data: battle }) : res.status(404).json({ message: 'Battle not found' })))
                .catch((err) => res.status(500).json({ err }));
        };
        this.delete = (req, res, next) => {
            const battleId = req.params.id;
            return Battle_1.default.findByIdAndDelete(battleId)
                .then((battle) => (battle ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Battle not found' })))
                .catch((err) => res.status(500).json({ err }));
        };
        this.generateBattle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repo.generateBattle();
            return res.status(200).json({
                data
            });
        });
        this.repo = new BattleRepo_1.default();
    }
}
exports.default = BattleController;
//# sourceMappingURL=battle.controller.js.map