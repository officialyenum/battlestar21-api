import Character, { ICharacter } from "../models/Character";


class CharacterRepo {

    private _character;
    constructor(character:ICharacter) {
        this._character =  character
    }

    generateCharacterName() {
        return this._character.name;
    }
}


export default CharacterRepo;
