import {Exercise} from "./Exercise";


export interface Workout {
    id: string,
    title: string,
    times: string[],
    exercises: Exercise[]
}