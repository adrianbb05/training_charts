import {addInformationToExistentWorkout, addNewWorkout, createId, getExistentWorkout} from "./workoutHelper";
import {WorkoutData} from "../entities/WorkoutData";

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

