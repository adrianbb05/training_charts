import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "../ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "../ui/chart"
import {Exercise} from "../../utils/entities/Exercise";
import {getWorkouts} from "../../utils/mapper/workoutHelper";
import {Workout} from "../../utils/entities/Workout";
import {Set} from "../../utils/entities/Set"
import {ChartElement, setChartElement} from "../../utils/chartCreationUtils";

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

    let chartTitle: string = ""

    exerciseWorkoutMap.forEach((exercise, workout) => {
        let sets: Set[] = exercise.sets
        let chartElement = setChartElement(chartType, chartTitle, sets, chartConfig, workout);
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
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="workout"
                            tickLine={false}
                            axisLine={false}
                            // Change width
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Line
                            dataKey="exercise"
                            type="linear"
                            stroke="var(--color-exercise)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    The Chart has a total of {chartData.length} entries
                </div>
            </CardFooter>

        </Card>
    )
}
