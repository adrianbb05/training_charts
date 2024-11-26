import {mapToSetType} from "./setTypeMapper";
import {Set} from "../entities/Set";
import {ExerciseEntry} from "../entities/entry/ExerciseEntry";
import {Exercise} from "../entities/Exercise";

function createSet(workoutEntry: any): Set {
    return {
        index: Number.parseInt(workoutEntry.set_index),
        setType: mapToSetType(workoutEntry.set_type),
        weight: Number.parseInt(workoutEntry.weight_kg),
        reps: Number.parseInt(workoutEntry.reps),
        distance: Number.parseInt(workoutEntry.distance_km),
        duration: Number.parseInt(workoutEntry.duration_seconds),
        rpe: workoutEntry.rpe
    }
}

export function createExerciseEntry(workoutEntry: any): ExerciseEntry {
    return {
        title: workoutEntry.exercise_title,
        note: workoutEntry.exercise_note,
        description: workoutEntry.description,
        set: createSet(workoutEntry)
    }
}

export function createExercise(workoutEntry: any): Exercise {
    return {
        title: workoutEntry.exercise_title,
        note: workoutEntry.exercise_note,
        description: workoutEntry.description,
        sets: [createSet(workoutEntry)],
    }
}