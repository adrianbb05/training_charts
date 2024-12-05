import {ExerciseTypeButton} from "./ExerciseTypeButton";
import {ExerciseChartType} from "./charts/ExerciseChart";

interface ExerciseTypeButtonsProps {
    setChartType: React.Dispatch<React.SetStateAction<ExerciseChartType>>;
}

export function ExerciseTypeButtons({setChartType}: ExerciseTypeButtonsProps) {
    return <div className={"grid grid-cols-4"}>
        <ExerciseTypeButton buttonContent={"Max Weight"}
                            setChartType={() => setChartType(ExerciseChartType.MAX_WEIGHT)}
        />
        <ExerciseTypeButton buttonContent={"Session volume"}
                            setChartType={() => setChartType(ExerciseChartType.SESSION_VOLUME)}
        />
        <ExerciseTypeButton buttonContent={"Set Volume"}
                            setChartType={() => setChartType(ExerciseChartType.SET_VOLUME)}
        />
        <ExerciseTypeButton buttonContent={"Total Reps"}
                            setChartType={() => setChartType(ExerciseChartType.TOTAL_REPS)}
        />
    </div>
}