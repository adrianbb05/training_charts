import {useState} from "react";
import {handleExerciseNames} from "../utils/ExerciseUtils";
import {ExerciseComparison} from "./charts/ExerciseComparisonChart";
import {ExerciseChartType} from "./charts/ExerciseChart";
import {ExerciseTypeButtons} from "./ExerciceTypeButtons";
import {SearchBar} from "./SearchBar";

export function ExerciseComparisonSelection() {
    const [exercise1, setExercise1] = useState("")
    const [exercise2, setExercise2] = useState("")
    const [chartType, setChartType] = useState(ExerciseChartType.MAX_WEIGHT)
    const [inputValue, setInputValue] = useState("")

    const resetExercises = () => {
        setExercise1("")
        setExercise2("")
        setInputValue("")
    }

    let exerciseNames: string[] = handleExerciseNames(inputValue)
    let exerciseDivs: any[]
    if (exercise1 === "") {
        exerciseDivs = exerciseNames.map(exercise =>
            <div onClick={() => setExercise1(exercise)}>
                {exercise}
            </div>
        )
    } else {
        exerciseDivs = exerciseNames.map(exercise =>
            <div onClick={() => setExercise2(exercise)}>
                {exercise}
            </div>
        )
    }

    if (exercise2 !== "") {
        return <>
            <div>
                <button onClick={resetExercises}>Reset Exercises</button>
                <ExerciseTypeButtons setChartType={setChartType}/>
                <ExerciseComparison exercise1={exercise1} exercise2={exercise2}
                                    chartType={chartType}/>
            </div>
        </>
    }


    return <>
        <div>
            <button onClick={resetExercises}>Reset Exercises</button>
            <SearchBar setInputValue={setInputValue}/>
            <nav className="grid grid-cols-1 gap-2">
                {exerciseDivs}
            </nav>
        </div>
    </>

}