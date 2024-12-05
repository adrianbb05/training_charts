import {NavLink, Route} from "react-router";
import {ExerciseHomePage} from "../components/ExerciseHomePage";
import {Workout} from "./entities/Workout";
import {getWorkouts} from "./mapper/workoutHelper";

export function convertNamesToElements(exerciseNames: string[]) {
    return exerciseNames.map(exercise => {
            let path = `/exercise_${exercise.toLowerCase().replaceAll(" ", "_")}`;
            let link = <NavLink key={path} to={path}>{exercise}</NavLink>
            let route = <Route path={path} element={<ExerciseHomePage exercise={exercise}/>}></Route>
            return {
                link: link,
                route: route
            }
        }
    );
}

export function handleExerciseNames(searchBarInput: string | undefined): string[] {
    const workouts: Workout[] = getWorkouts()
    let exerciseNames: string[] = []
    let allExercises: string[] = workouts.flatMap(workout => workout.exercises).map(exercise => exercise.title)

    function addExerciseTitleIfNotRepeated(exercise: string) {
        if (!exerciseNames.includes(exercise)) {
            exerciseNames.push(exercise)
        }
    }

    if (searchBarInput === undefined) {
        allExercises.forEach(addExerciseTitleIfNotRepeated)
    } else {
        allExercises.filter(exercise => exercise.toLowerCase().includes(searchBarInput.toLowerCase()))
            .forEach(addExerciseTitleIfNotRepeated)
    }
    return exerciseNames
}

