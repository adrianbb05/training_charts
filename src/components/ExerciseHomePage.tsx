import {ExerciseChart, ExerciseChartType} from "./charts/ExerciseChart";
import {useState} from "react";

interface ExerciseHomePageProps {
    exercise: string;
}

export function ExerciseHomePage({exercise}: ExerciseHomePageProps) {
    const [chartType, setChartType] = useState(ExerciseChartType.MAX_WEIGHT)
    return (
        <div className={"grid grid-cols-1 gap-4"}>
            <h1 className={"text-center"}>{exercise}</h1>
            <div className={"grid grid-cols-4"}>
                <button onClick={() => setChartType(ExerciseChartType.MAX_WEIGHT.valueOf())}>
                    Max Weight
                </button>
                <button onClick={() => setChartType(ExerciseChartType.SESSION_VOLUME.valueOf())}>
                    Session volume
                </button>
                <button onClick={() => setChartType(ExerciseChartType.SET_VOLUME.valueOf())}>
                    Set Volume
                </button>
                <button onClick={() => setChartType(ExerciseChartType.TOTAL_REPS.valueOf())}>
                    Total Reps
                </button>
            </div>
            <ExerciseChart chartType={chartType} exerciseToDisplay={exercise}/>
        </div>
    )
}
