import {Workout} from "../entities/Workout";
import {createExercise, createExerciseEntry} from "./exerciseMapper";
import {Exercise} from "../entities/Exercise";

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

    if (!exerciseFound) {
        actualWorkout.exercises.push(new Exercise(actualExercise.title, actualExercise.note, actualExercise.description, [actualExercise.set]));
    }
}

export function addNewWorkout(workoutEntry: any, workoutId: string, times: string[]) {
    let actualExercise = createExercise(workoutEntry)
    let workoutTitle: string = workoutEntry.title
    let workout = new Workout(workoutId, workoutTitle, times, [actualExercise])

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
