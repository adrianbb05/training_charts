import {Set} from './Set'

export class Exercise {

    private _title: string
    private _note: string
    private _description: string
    private _sets: Set[]


    constructor(title: string, note: string, description: string, sets: Set[]) {
        this._title = title;
        this._note = note;
        this._description = description
        this._sets = sets;
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

    get sets(): Set[] {
        return this._sets;
    }

    set sets(value: Set[]) {
        this._sets = value;
    }
}