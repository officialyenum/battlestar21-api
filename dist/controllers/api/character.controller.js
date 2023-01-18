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
            return Character_1.default.find()
                .then((characters) => res.status(200).json({ data: characters }))
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
        this.generateName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repo.generateTwoCharacters();
            return res.status(200).json({
                data
            });
        });
        this.repo = new CharacterRepo_1.default();
    }
}
exports.default = CharacterController;
//# sourceMappingURL=character.controller.js.map