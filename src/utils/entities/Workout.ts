import {Exercise} from "./Exercise";



export class Workout {

    private _id: string
    private _title: string
    private _times: string[]
    private _exercises: Exercise[]


    constructor(id: string, title: string, times: string[], exercises: Exercise[]) {
        this._id = id;
        this._title = title;
        this._times = times;
        this._exercises = exercises;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get times(): string[] {
        return this._times;
    }

    set times(value: string[]) {
        this._times = value;
    }

    get exercises(): Exercise[] {
        return this._exercises;
    }

    set exercises(value: Exercise[]) {
        this._exercises = value;
    }
}