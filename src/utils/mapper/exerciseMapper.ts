import {SetType} from "../entities/SetType";
import {mapToSetType} from "./setTypeMapper";
import {Set} from "../entities/Set";
import {ExerciseEntry} from "../entities/entry/ExerciseEntry";
import {Exercise} from "../entities/Exercise";

function createSet(workoutEntry: any) {
    let index: number = Number.parseInt(workoutEntry.set_index)
    let type: SetType = mapToSetType(workoutEntry.set_type)
    let weight: number = Number.parseInt(workoutEntry.weight_kg)
    let reps: number = Number.parseInt(workoutEntry.reps)
    let distanceKm: number = Number.parseInt(workoutEntry.distance_km)
    let duration: number = Number.parseInt(workoutEntry.duration_seconds)
    let rpe = workoutEntry.rpe

    return new Set(index, type, weight, reps, distanceKm, duration, rpe)
}

export function createExerciseEntry(workoutEntry: any) {
    let title: string = workoutEntry.exercise_title
    let note: string = workoutEntry.exercise_note
    let description: string = workoutEntry.description

    let set: Set = createSet(workoutEntry)

    return new ExerciseEntry(title, note, description, set)
}

export function createExercise(workoutEntry: any) {
    let title: string = workoutEntry.exercise_title
    let note: string = workoutEntry.exercise_note
    let description: string = workoutEntry.description

    let set: Set[] = [createSet(workoutEntry)]

    return new Exercise(title, note, description, set)
}