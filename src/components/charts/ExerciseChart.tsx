import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardHeader, CardTitle,} from "../ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "../ui/chart"
import {Exercise} from "../../utils/entities/Exercise";
import {getWorkouts} from "../../utils/mapper/workoutHelper";
import {Workout} from "../../utils/entities/Workout";
import {Set} from "../../utils/entities/Set"
import {SimpleChartElement, setChartElement, setChartTitleName} from "../../utils/chartCreationUtils";
import {workoutsToMap} from "../../utils/mapper/workoutMapper";

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
    let workoutExerciseMap: Map<Workout, Exercise> = workoutsToMap(workouts, exerciseToDisplay)
    let chartData: SimpleChartElement[] = []
    let chartTitle: string = setChartTitleName(chartType)
    workoutExerciseMap.forEach((exercise, workout) => {
        let sets: Set[] = exercise.sets
        let chartElement: SimpleChartElement = setChartElement(chartType, sets, chartConfig, workout);
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