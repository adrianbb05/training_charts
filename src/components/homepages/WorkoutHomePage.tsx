import {Workout} from "../../utils/entities/Workout";

export function WorkoutHomePage({workout}: { workout: Workout }) {
    return (
        <>
            <h1>{workout.title}</h1>
        </>
    )
}