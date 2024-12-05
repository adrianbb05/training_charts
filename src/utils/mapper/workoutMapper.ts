import {addInformationToExistentWorkout, addNewWorkout, createId, getExistentWorkout} from "./workoutHelper";
import {WorkoutData} from "../entities/WorkoutData";
import {Workout} from "../entities/Workout";
import {Exercise} from "../entities/Exercise";

export function mapDataToWorkout(workoutData: WorkoutData[]) {
    for (let i = 0; i < workoutData.length; i++) {
        let workoutEntry = workoutData[i]
        let times: string[] = [workoutEntry.start_time, workoutEntry.end_time]
        let workoutId = createId(times);

        let actualWorkout = getExistentWorkout(workoutId);

        if (actualWorkout !== null) {
            addInformationToExistentWorkout(workoutEntry, actualWorkout);
        } else {
            addNewWorkout(workoutEntry, workoutId, times);
        }
    }
}

export function workoutsToMap(workouts: Workout[], exerciseToDisplay: string) {
    let workoutExerciseMap: Map<Workout, Exercise> = new Map();
    for (let i = workouts.length - 1; i >= 0; i--) {
        let workout = workouts[i]
        for (let exercise of workout.exercises) {
            if (exercise.title === exerciseToDisplay) {
                workoutExerciseMap.set(workout, exercise)
            }
        }
    }
    return workoutExerciseMap
}
