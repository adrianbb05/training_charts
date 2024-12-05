import React from "react";

interface ExerciseTypeButtonProps {
    buttonContent: string;
    setChartType: () => void;
}

export function ExerciseTypeButton({buttonContent, setChartType}: ExerciseTypeButtonProps) {
    return <>
        <button onClick={setChartType}>
            {buttonContent}
        </button>
    </>
}