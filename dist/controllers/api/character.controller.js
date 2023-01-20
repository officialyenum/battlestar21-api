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
            // EXTRACT QUERY
            const { page, count } = req.query;
            const query = {
                page: page || 1,
                count: count || 10
            };
            try {
                // GET TOTAL CHARACTERS
                totalItems = yield Character_1.default.find({}).count();
                const queryPage = +query.page;
                const queryCount = +query.count;
                // GET PAGINATED CHARACTERS
                const characters = yield this.repo.getCharacters(queryPage, queryCount);
                return res.status(200).json({
                    data: characters,
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
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const characters = yield this.repo.getCharacters(1, 5);
            characters.forEach((character) => __awaiter(this, void 0, void 0, function* () {
                yield this.repo.deleteCharacterById(character._id);
            }));
            return res.status(201).json({ message: 'deleted' });
        });
        this.getRandom = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { character_id } = req.params;
            console.log(character_id);
            // Get the count of all users
            let userIsSame = true;
            let randomUser = null;
            let count = 0;
            try {
                const characterCount = yield this.repo.getCharacterCount();
                const random = Math.floor(Math.random() * characterCount);
                console.log(random);
                do {
                    // Breaker condition to prevent infinite loop
                    if (count > 5) {
                        throw new Error("Error occured generating random character");
                    }
                    else {
                        count++;
                    }
                    randomUser = yield this.repo.getRandomCharacter(random);
                    // Make Both ID String
                    const randomUserId = JSON.stringify(randomUser._id);
                    const characterId = JSON.stringify(character_id);
                    console.log(randomUserId);
                    console.log(characterId);
                    if (characterId !== randomUserId) {
                        userIsSame = false;
                    }
                } while (userIsSame);
                return res.status(200).json({
                    status: true,
                    character_id,
                    randomUser,
                    extra: userIsSame,
                    data: randomUser
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: error.message
                });
            }
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