import {getWorkouts} from "../utils/mapper/workoutHelper";
import {BrowserRouter as Router, NavLink, Route, Routes} from "react-router"
import {ExerciseHomePage} from "./ExerciseHomePage";
import {useState} from "react";


export function ExercisesNav() {
    const [showLinks, setShowLinks] = useState(true)

    const UpdateShowLinks = () => {
        setShowLinks(!showLinks)
    }

    let workouts = getWorkouts();

    let exerciseNames: string[] = []

    let allExercises = workouts.flatMap(workout => workout.exercises).map(exercise => exercise.title)

    allExercises.forEach(exercise => {
        if (!exerciseNames.includes(exercise)) {
            exerciseNames.push(exercise)
        }
    })


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

    if (showLinks) {
        return (
            <div>
                <button onClick={UpdateShowLinks}>Exercises</button>
                <Router>
                    <nav className={"grid grid-cols-4 gap-4"}>
                        {exerciseComponents.map(ec => ec.link)}
                    </nav>
                    <Routes>
                        {exerciseComponents.map(ec => ec.route)}
                    </Routes>
                </Router>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={UpdateShowLinks}>Exercises</button>
                <br/>
                <Router>
                    <Routes>
                        {exerciseComponents.map(ec => ec.route)}
                    </Routes>
                </Router>
            </div>
        )
    }


}