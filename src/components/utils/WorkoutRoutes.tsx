import {getWorkouts} from "../../utils/mapper/workoutHelper";
import {BrowserRouter as Router, Route, Routes} from "react-router";
import {Workout} from "../../utils/entities/Workout";
import {WorkoutHomePage} from "../homepages/WorkoutHomePage";

export function WorkoutRoutes() {
    let workouts: Workout[] = getWorkouts();
    let routes = handleWorkouts(workouts);
    return (<div>

    </div>);
}

function handleWorkouts(workouts: Workout[]) {
    return workouts.map(workout => {
        let path: string = workout.id.replaceAll(" ", ``)
        return <Route key={path}  path={path} element={<WorkoutHomePage workout={workout}/>}/>
    })
}