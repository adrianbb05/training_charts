import './index.css';
import {useState} from "react";
import {ExercisesNav} from "./components/ExercisesNav";
import {ExerciseComparisonSelection} from "./components/ExerciseComparisionSelection";
import {FileUpload} from "./components/FileUpload";

enum ChartToShow {
    EXERCISE,
    EXERCISE_COMPARISION
}

function App() {
    const [isUploaded, setIsUploaded] = useState(false)
    const [chartToShow, setChartToShow] = useState(ChartToShow.EXERCISE)


    const handleSetIsUploaded = () => {
        setIsUploaded(true);
    }

    let homePageToShow = () => {
        if (chartToShow === ChartToShow.EXERCISE) {
            return <ExercisesNav/>
        } else if (chartToShow === ChartToShow.EXERCISE_COMPARISION) {
            return <ExerciseComparisonSelection/>
        }
    }

    if (isUploaded) {
        return <>
            <div className={"grid grid-cols-1"}>
                <div onClick={() => setChartToShow(ChartToShow.EXERCISE)}>
                    Exercises
                </div>
                <div onClick={() => setChartToShow(ChartToShow.EXERCISE_COMPARISION)}>
                    Exercise Comparison
                </div>
            </div>
            {homePageToShow()}
        </>
    } else {
        return (
            <>
                <FileUpload setIsUploaded={handleSetIsUploaded}/>
            </>
        )
            ;
    }
}

export default App;
