import './index.css';
import {useState} from "react";
import {ExercisesNav} from "./components/ExercisesNav";
import {ExerciseComparisonSelection} from "./components/ExerciseComparisionSelection";
import {FileUpload} from "./components/FileUpload";
import {WorkoutRoutes} from "./components/WorkoutRoutes";

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
            return <ExerciseComparisonSelection/>
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

