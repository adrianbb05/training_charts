import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "../ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "../ui/chart"
import {Exercise} from "../../utils/entities/Exercise";
import {getWorkouts} from "../../utils/mapper/workoutHelper";

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
    // TODO: change chart variables
    let workouts = getWorkouts()
    let exercises: Exercise[] = []

    for (let i = workouts.length - 1; i >= 0; i--) {
        let workout = workouts[i]
        for (let exercise of workout.exercises) {
            if (exercise.title === exerciseToDisplay) {
                exercises.push(exercise)
            }
        }
    }

    let chartData: any[] = []
    let title: string = ""
    switch (chartType) {
        case ExerciseChartType.MAX_WEIGHT: {
            title = `Max weight`
            exercises.forEach(exercise => {
                let sets = exercise.sets;
                let maxWeight = 0
                for (let set of sets) {
                    if (set.weight > maxWeight) {
                        maxWeight = set.weight
                    }
                }
                chartData.push({
                    month: "",
                    exercise: maxWeight
                })
            })
            break
        }
        case ExerciseChartType.SET_VOLUME: {
            title = "Volume"
            exercises.forEach(exercise => {
                let sets = exercise.sets
                let maxVolume = 0
                for (let set of sets) {
                    let setVolume = set.weight * set.reps
                    if (setVolume > maxVolume) {
                        maxVolume = setVolume
                    }
                }
                chartData.push({
                    month: "",
                    exercise: maxVolume
                })
            })
            break
        }
        case ExerciseChartType.SESSION_VOLUME: {
            title = "Session Volume"
            exercises.forEach(exercise => {
                let sets = exercise.sets;
                let sessionVolume = 0
                for (let set of sets) {
                    let setVolume = set.weight * set.reps;
                    sessionVolume += setVolume
                }
                chartData.push({
                    month: "",
                    exercise: sessionVolume
                })
            })
            break
        }
        case ExerciseChartType.TOTAL_REPS: {
            title = "Total reps"
            exercises.forEach(exercise => {
                let sets = exercise.sets;
                let sessionReps = 0
                for (let set of sets) {
                    sessionReps += set.reps
                }
                chartData.push({
                    month: "",
                    exercise: sessionReps

                })
            })
            break
        }
    }
    return (
        <Chart chartData={chartData} title={title}/>
    )

}

const chartConfig = {
    exercise: {
        label: "Exercise",
        color: "hsl(var(--chart-1))",
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
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
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
