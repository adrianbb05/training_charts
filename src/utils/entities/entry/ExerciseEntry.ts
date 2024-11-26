import {Set} from "../Set";

export class ExerciseEntry {

    private _title: string
    private _note: string
    private _description: string
    private _set: Set


    constructor(title: string, note: string, description: string, sets: Set) {
        this._title = title;
        this._note = note;
        this._description = description
        this._set = sets;
    }


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get set(): Set {
        return this._set;
    }

    set set(value: Set) {
        this._set = value;
    }
}
