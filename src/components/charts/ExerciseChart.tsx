import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardHeader, CardTitle,} from "../ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "../ui/chart"
import {Exercise} from "../../utils/entities/Exercise";
import {getWorkouts} from "../../utils/mapper/workoutHelper";
import {Workout} from "../../utils/entities/Workout";
import {Set} from "../../utils/entities/Set"
import {ChartElement, setChartElement, setChartTitleName} from "../../utils/chartCreationUtils";

export enum ExerciseChartType {
    MAX_WEIGHT,
    SET_VOLUME,
    SESSION_VOLUME,
    TOTAL_REPS
}

interface ExerciseChartProps {
    exerciseToDisplay: string;
    chartType: ExerciseChartType;
}

export function ExerciseChart({exerciseToDisplay, chartType}: ExerciseChartProps) {
    let workouts: Workout[] = getWorkouts()
    let exerciseWorkoutMap: Map<Workout, Exercise> = new Map()
    for (let i = workouts.length - 1; i >= 0; i--) {
        let workout = workouts[i]
        for (let exercise of workout.exercises) {
            if (exercise.title === exerciseToDisplay) {
                exerciseWorkoutMap.set(workout, exercise)
            }
        }
    }
    let chartData: ChartElement[] = []
    let chartTitle: string = setChartTitleName(chartType)
    exerciseWorkoutMap.forEach((exercise, workout) => {
        let sets: Set[] = exercise.sets
        let chartElement: ChartElement = setChartElement(chartType, sets, chartConfig, workout);
        chartData.push(chartElement)
    })
    return (
        <Chart chartData={chartData} title={chartTitle}/>
    )
}

const chartConfig = {
    exercise: {
        label: "Exercise",
        color: "blue",
    },
} satisfies ChartConfig

interface ChartProps {
    title: string;
    chartData: any[];
}

function Chart({title, chartData}: ChartProps) {
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
                        }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                        <XAxis
                            width={9}
                            dataKey="workout"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            angle={-70}
                            tickFormatter={(value: string) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Line
                            dataKey="exercise"
                            type="linear"
                            stroke="var(--color-exercise)"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
