"use client"

import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardHeader, CardTitle,} from "../ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "../ui/chart"
import {getWorkouts} from "../../utils/mapper/workoutHelper";
import {workoutsToMap} from "../../utils/mapper/workoutMapper";
import {setChartElement} from "../../utils/chartCreationUtils";
import {Set} from "../../utils/entities/Set"
import {ExerciseChartType} from "./ExerciseChart";
import {Exercise} from "../../utils/entities/Exercise";
import {Workout} from "../../utils/entities/Workout";


interface ExerciseComparisonProps {
    exercise1: string
    exercise2: string
    chartType: ExerciseChartType
}

interface ComparisonExercises {
    exercise1: number,
    exercise2?: number
}

export function ExerciseComparison({exercise1, exercise2, chartType}: ExerciseComparisonProps) {
    let workouts = getWorkouts();
    let workoutsExercise1Map: Map<Workout, Exercise> = workoutsToMap(workouts, exercise1);
    let workoutsExercise2Map: Map<Workout, Exercise> = workoutsToMap(workouts, exercise2);

    let data: Map<number, ComparisonExercises> = new Map()

    let nodeIndex = 0;
    workoutsExercise1Map.forEach((exercise, workout) => {
        let sets: Set[] = exercise.sets
        let chartElement = setChartElement(chartType, sets, chartConfig, workout)
        data.set(nodeIndex, {
            exercise1: chartElement.exercise,
        })
        nodeIndex++
    })

    nodeIndex = 0
    workoutsExercise2Map.forEach((exercise, workout) => {
        let sets: Set[] = exercise.sets
        let chartElement = setChartElement(chartType, sets, chartConfig, workout)
        if (data.has(nodeIndex)) {
            // @ts-ignore
            const comparison: ComparisonExercises = data.get(nodeIndex);
            comparison.exercise2 = chartElement.exercise
        }
        nodeIndex++
    })

    let mappedData = mapDataToChartData(data)

    return <div>
        <ExerciseComparisonChart chartData={mappedData} title={`Comparison between ${exercise1} and ${exercise2}`}/>
    </div>
}

function mapDataToChartData(data: Map<number, ComparisonExercises>) {
    let mappedData: any[] = []
    data.forEach((mapData, index) => {
        mappedData.push({
            month: index.valueOf(),
            exercise1: mapData.exercise1,
            exercise2: mapData.exercise2
        })
    })
    return mappedData
}

export interface ComparisonChartConfig extends ChartConfig {

}

const chartConfig: ComparisonChartConfig = {
    exercise1: {
        label: "kg",
        color: "hsl(var(--chart-1))",
    },
    exercise2: {
        label: "kg",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

interface ExerciseComparisonChartProps {
    chartData: any,
    title: string
}

function ExerciseComparisonChart({chartData, title}: ExerciseComparisonChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                        <Line
                            dataKey="exercise1"
                            type="monotone"
                            stroke="var(--color-exercise1)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="exercise2"
                            type="monotone"
                            stroke="var(--color-exercise2)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
