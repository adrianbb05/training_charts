import {SetType} from "./SetType";

export class Set {

    private _index: number
    private _setType: SetType
    private _weight: number
    private _reps: number
    private _distance: number
    private _duration: number
    private _rpe: string


    constructor(index: number, setType: SetType, weight: number, reps: number, distance: number, duration: number, rpe: string) {
        this._index = index;
        this._setType = setType;
        this._weight = weight;
        this._reps = reps;
        this._distance = distance;
        this._duration = duration;
        this._rpe = rpe;
    }


    get index(): number {
        return this._index;
    }

    get setType(): SetType {
        return this._setType;
    }

    get weight(): number {
        return this._weight;
    }

    get reps(): number {
        return this._reps;
    }

    get distance(): number {
        return this._distance;
    }

    get duration(): number {
        return this._duration;
    }

    get rpe(): string {
        return this._rpe;
    }
}