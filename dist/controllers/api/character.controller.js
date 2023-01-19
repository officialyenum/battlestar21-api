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
const Character_1 = __importDefault(require("../../models/Character"));
const CharacterRepo_1 = __importDefault(require("../../repositories/CharacterRepo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load .env file
class CharacterController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let totalItems;
            const { page, count } = req.query;
            const query = {
                page: page || 1,
                count: count || 10
            };
            totalItems = yield Character_1.default.find({}).count();
            const queryPage = +query.page;
            const queryCount = +query.count;
            return Character_1.default.find()
                .sort({ "wins": "desc", "loss": "desc" })
                .skip((queryPage - 1) * queryCount)
                .limit(queryCount)
                .lean()
                .then((characters) => {
                res.status(200).json({
                    data: characters,
                    currentPage: queryPage,
                    hasNextPage: queryCount * queryPage < totalItems,
                    hasPreviousPage: queryPage > 1,
                    nextPage: queryPage + 1,
                    previousPage: queryPage - 1,
                    lastPage: Math.ceil(totalItems / queryCount)
                });
            })
                .catch((err) => res.status(500).json({ err }));
        });
        this.show = (req, res, next) => {
            const characterId = req.params.id;
            return Character_1.default.findById(characterId)
                .select('-__v')
                .then((post) => (post ? res.status(200).json({ post }) : res.status(404).json({ message: 'Post not found' })))
                .catch((err) => res.status(500).json({ err }));
        };
        this.update = (req, res, next) => {
            const characterId = req.params.id;
            return Character_1.default.findById(characterId)
                .then((updatedCharacter) => {
                if (updatedCharacter) {
                    updatedCharacter.set(req.body);
                    return updatedCharacter
                        .save()
                        .then((newCharacter) => res.status(201).json({ newCharacter }))
                        .catch((err) => res.status(500).json({ err }));
                }
                else {
                    return res.status(404).json({ message: 'Post not found' });
                }
            })
                .catch((err) => res.status(500).json({ err }));
        };
        this.delete = (req, res, next) => {
            const characterId = req.params.id;
            return Character_1.default.findByIdAndDelete(characterId)
                .then((character) => (character ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Character not found' })))
                .catch((err) => res.status(500).json({ err }));
        };
        this.getRandom = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { character_id } = req.params;
            console.log(character_id);
            // Get the count of all users
            const characterCount = yield this.repo.getCharacterCount();
            const random = Math.floor(Math.random() * characterCount);
            const randomUser = yield this.repo.getRandomCharacter(random);
            return res.status(200).json({
                data: randomUser
            });
        });
        this.generateName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repo.generateCharacter();
            return res.status(200).json({
                data
            });
        });
        this.repo = new CharacterRepo_1.default();
    }
}
exports.default = CharacterController;
//# sourceMappingURL=character.controller.js.map