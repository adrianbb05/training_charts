import {getWorkouts} from "../utils/mapper/workoutHelper";
import {BrowserRouter as Router, NavLink, Route, Routes} from "react-router"
import {ExerciseHomePage} from "./ExerciseHomePage";
import {useState} from "react";
import {Workout} from "../utils/entities/Workout";
import {SearchBar} from "./SearchBar";


export function ExercisesNav() {
    const [inputValue, setInputValue] = useState("")
    let exerciseNames: string[] = handleExerciseNames(inputValue);
    let exerciseComponents = exerciseNames.map(exercise => {
            let path = `/exercise_${exercise.toLowerCase().replaceAll(" ", "_")}`;
            let link = <NavLink key={path} to={path}>{exercise}</NavLink>
            let route = <Route path={path} element={<ExerciseHomePage exercise={exercise}/>}></Route>
            return {
                link: link,
                route: route
            }
        }
    )

    return (
        <div>
            <Router>
                <div className="flex min-h-screen">
                    <div className="w-1/4 p-4">
                        <SearchBar setInputValue={setInputValue}/>
                        <nav className="grid grid-cols-1 gap-2">
                            {exerciseComponents.map(ec => ec.link)}
                        </nav>
                    </div>
                    <div className="flex-grow p-4">
                        <Routes>
                            {exerciseComponents.map(ec => ec.route)}
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    )
}

function handleExerciseNames(searchBarInput: string) {
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
