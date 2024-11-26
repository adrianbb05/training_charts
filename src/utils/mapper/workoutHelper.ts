import {Workout} from "../entities/Workout";
import {createExercise, createExerciseEntry} from "./exerciseMapper";

let workouts: Workout[] = []

export function addInformationToExistentWorkout(workoutEntry: any, actualWorkout: Workout) {
    let actualExercise = createExerciseEntry(workoutEntry);
    let exerciseFound = false;

    for (const exercise of actualWorkout.exercises) {
        if (exercise.title === actualExercise.title) {
            exercise.sets.push(actualExercise.set);
            exerciseFound = true;
            break;
        }
    }

    const exercise = {
        title: actualExercise.title,
        note: actualExercise.note,
        description: actualExercise.description,
        sets: [actualExercise.set]
    }
    if (!exerciseFound) {
        actualWorkout.exercises.push(exercise);
    }
}

export function addNewWorkout(workoutEntry: any, workoutId: string, times: string[]) {
    let actualExercise = createExercise(workoutEntry)
    let workoutTitle: string = workoutEntry.title
    let workout: Workout = {
        id: workoutId,
        title: workoutTitle,
        times: times,
        exercises: [actualExercise]
    }
    workouts.push(workout)
}


export function createId(times: string[]) {
    return times[0] + "_" + times[1]
}

export function getExistentWorkout(workoutId: string) {
    for (const workout of workouts) {
        if (workout.id === workoutId) {
            return workout
        }
    }
    return null
}

export function getWorkouts() {
    return workouts
}
