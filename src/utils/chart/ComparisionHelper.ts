import {Workout} from "../entities/Workout";
import {Exercise} from "../entities/Exercise";
import {ExerciseChartType} from "../../components/charts/ExerciseChart";
import {Set} from "../entities/Set";
import {setChartElement} from "../chartCreationUtils";
import {ChartConfig} from "../../components/ui/chart";

export interface ComparisonExercises {
    exercise1: number,
    exercise2?: number
}

export function handleDataCreation(biggerWorkoutExerciseMap: Map<Workout, Exercise>, smallerWorkoutExerciseMap: Map<Workout, Exercise>, chartType: ExerciseChartType, chartConfig: ChartConfig) {
    let data: Map<number, ComparisonExercises> = new Map()
    let nodeIndex = 0;
    biggerWorkoutExerciseMap.forEach((exercise, workout) => {
        let sets: Set[] = exercise.sets
        let chartElement = setChartElement(chartType, sets, chartConfig, workout, true)
        data.set(nodeIndex, {
            exercise1: chartElement.exercise,
        })
        nodeIndex++
    })

    nodeIndex = 0
    smallerWorkoutExerciseMap.forEach((exercise, workout) => {
        let sets: Set[] = exercise.sets
        let chartElement = setChartElement(chartType, sets, chartConfig, workout, true)
        if (data.has(nodeIndex)) {
            // @ts-ignore
            const comparison: ComparisonExercises = data.get(nodeIndex);
            comparison.exercise2 = chartElement.exercise
        }
        nodeIndex++
    })
    return data
}

export function getBiggestExerciseMap(workoutsExercise1Map: Map<Workout, Exercise>, workoutsExercise2Map: Map<Workout, Exercise>) {
    if (workoutsExercise1Map.size > workoutsExercise2Map.size) {
        return workoutsExercise1Map
    } else {
        return workoutsExercise2Map
    }
}