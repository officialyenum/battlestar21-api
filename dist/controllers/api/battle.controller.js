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
const CharacterRepo_1 = __importDefault(require("../../repositories/CharacterRepo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env file
class BattleController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let totalItems;
            const { page, count } = req.query;
            // EXTRACT QUERY
            const query = {
                page: page || 1,
                count: count || 10
            };
            try {
                // GET TOTAL BATTLE
                totalItems = yield this.repo.getBattleCount();
                const queryPage = +query.page;
                const queryCount = +query.count;
                // GET PAGINATED BATTLES
                const battles = yield this.repo.getBattles(queryPage, queryCount);
                return res.status(200).json({
                    data: battles,
                    currentPage: queryPage,
                    hasNextPage: queryCount * queryPage < totalItems,
                    hasPreviousPage: queryPage > 1,
                    nextPage: queryPage + 1,
                    previousPage: queryPage - 1,
                    lastPage: Math.ceil(totalItems / queryCount)
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.show = (req, res, next) => {
            const battleId = req.params.id;
            return Battle_1.default.findById(battleId)
                .populate("characterOne")
                .populate("characterTwo")
                .populate("winner")
                .then((battle) => (battle ? res.status(200).json({ data: battle }) : res.status(404).json({ message: 'Battle not found' })))
                .catch((err) => res.status(500).json({ err }));
        };
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const battles = yield this.repo.getBattles(1, 5);
            battles.forEach((battle) => __awaiter(this, void 0, void 0, function* () {
                yield this.repo.deleteBattleById(battle._id);
            }));
            return res.status(201).json({ message: 'deleted' });
        });
        this.generateBattle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { characterOneId, characterTwoId } = req.body;
            if (characterOneId === characterTwoId) {
                return res.status(422).json({
                    status: false,
                    message: "Characters cannot Battle themselves"
                });
            }
            const playerOne = yield this.characterRepo.getCharacterById(characterOneId);
            const playerTwo = yield this.characterRepo.getCharacterById(characterTwoId);
            // Get RNG to Pick winner
            const randomNum = Math.round(Math.random() * 1);
            // Generate Battle Stage
            const stage = yield this.repo.generateBattleStage();
            // Confirm if Both players Exists
            if (!playerOne || !playerTwo) {
                return res.status(422).json({
                    status: false,
                    message: "players not specified"
                });
            }
            // Get Winner
            const winnerModel = randomNum === 1 ? playerTwo : playerOne;
            // Get Loser
            const loserModel = randomNum !== 1 ? playerTwo : playerOne;
            // Get Story By Generating Battle
            const story = yield this.repo.generateBattle(winnerModel.bio, loserModel.bio, stage);
            // Save Battle Record;
            const data = yield this.repo.saveBattle(playerOne._id, playerTwo._id, winnerModel._id, stage, story);
            // Update Characters win and Loss
            yield this.characterRepo.updateCharacterLoss(loserModel._id);
            yield this.characterRepo.updateCharacterWin(winnerModel._id);
            return Battle_1.default.findById(data._id)
                .populate("characterOne")
                .populate("characterTwo")
                .populate("winner")
                .then((battle) => (battle ? res.status(200).json({ data: battle }) : res.status(404).json({ message: 'Battle not found' })))
                .catch((err) => res.status(500).json({ err }));
        });
        this.repo = new BattleRepo_1.default();
        this.characterRepo = new CharacterRepo_1.default();
    }
}
exports.default = BattleController;
//# sourceMappingURL=battle.controller.js.map