import {SetType} from "./SetType";

export interface Set {
    index: number,
    setType: SetType,
    weight: number,
    reps: number,
    distance: number,
    duration: number
    rpe: string
}
