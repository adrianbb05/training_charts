import './index.css';
import {useState} from "react";
import {ExercisesNav} from "./components/nav/ExercisesNav";
import {ExerciseComparisonNav} from "./components/nav/ExerciseComparisionSelection";
import {FileUpload} from "./components/fileUpload/FileUpload";
import {WorkoutRoutes} from "./components/utils/WorkoutRoutes";

enum ChartToShow {
    EXERCISE,
    EXERCISE_COMPARISON
}

export default function App() {
    const [isUploaded, setIsUploaded] = useState(false)
    const [chartToShow, setChartToShow] = useState(ChartToShow.EXERCISE)


    const handleSetIsUploaded = () => {
        setIsUploaded(true);
    }

    let homePageToShow = () => {
        if (chartToShow === ChartToShow.EXERCISE) {
            return <ExercisesNav/>
        } else if (chartToShow === ChartToShow.EXERCISE_COMPARISON) {
            return <ExerciseComparisonNav/>
        }
    }

    if (isUploaded) {
        return <>
            <div className={"grid grid-cols-1"}>
                <div onClick={() => setChartToShow(ChartToShow.EXERCISE)}>
                    Exercises
                </div>
                <div onClick={() => setChartToShow(ChartToShow.EXERCISE_COMPARISON)}>
                    Exercise Comparison
                </div>
            </div>
            {homePageToShow()}
            <WorkoutRoutes/>
        </>
    } else {
        return (
            <>
                <FileUpload setIsUploaded={handleSetIsUploaded}/>
            </>
        );
    }
}

