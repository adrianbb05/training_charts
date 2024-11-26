import {Workout} from "../utils/entities/Workout";
import {getWorkouts} from "../utils/mapper/workoutHelper";
import {Exercise} from "../utils/entities/Exercise";

export function Exercises() {

    let workouts: Workout[] = getWorkouts();
    let exercises: string[] = provideExercises(workouts);

    return (
        <>
            <h1>Exercises</h1>
        </>
    )
}

function provideExercises(workouts: Workout[]): string[] {
    let exerciseNames: string[] = [];
    for (let workout of workouts) {
        let exercises: Exercise[] = workout.exercises;
        let notRepeatedExercises: string[] = exercises.filter(exercise => !exerciseNames.includes(exercise.title)).map(exercise => exercise.title);
        notRepeatedExercises.forEach(exercise => exerciseNames.push(exercise))
    }
    return exerciseNames
}


