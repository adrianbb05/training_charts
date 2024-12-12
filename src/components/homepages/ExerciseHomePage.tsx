import {ExerciseChart, ExerciseChartType} from "../charts/ExerciseChart";
import {useState} from "react";
import {ExerciseTypeButtons} from "../utils/ExerciceTypeButtons";

interface ExerciseHomePageProps {
    exercise: string;
}

export function ExerciseHomePage({exercise}: ExerciseHomePageProps) {
    const [chartType, setChartType] = useState(ExerciseChartType.MAX_WEIGHT)
    return (
        <div className={"grid grid-cols-1 gap-4"}>
            <h1 className={"text-center"}>{exercise}</h1>
            <ExerciseTypeButtons setChartType={setChartType}/>
            <ExerciseChart chartType={chartType} exerciseToDisplay={exercise}/>
        </div>
    )
}
