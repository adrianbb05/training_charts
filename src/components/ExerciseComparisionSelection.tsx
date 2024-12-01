import {useState} from "react";
import {handleExerciseNames} from "../utils/ExerciseUtils";

export function ExerciseComparisonSelection() {
    const [exercise1, setExercise1] = useState("")
    const [exercise2, setExercise2] = useState("")

    const resetExercises = () => {
        setExercise1("")
        setExercise2("")
    }

    let exerciseNames: string[] = handleExerciseNames(undefined)
    if (exercise1 === "") {
        exerciseNames.map(exercise =>
            <div onClick={() => setExercise1(exercise)}>
                {exercise}
            </div>
        )
    } else {
        exerciseNames.map(exercise =>
            <div onClick={() => setExercise2(exercise)}>
                {exercise}
            </div>
        )
    }

    return <>
        <div>
            <button onClick={resetExercises}>Reset Exercises</button>
        </div>
    </>
}