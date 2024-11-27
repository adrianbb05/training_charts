import {Set} from "./entities/Set";
import {ExerciseChartType} from "../components/charts/ExerciseChart";
import {ChartConfig} from "../components/ui/chart";
import {Workout} from "./entities/Workout";

export interface ChartElement {
    workout: string,
    exercise: number
}

export function setChartElement(chartType: ExerciseChartType, chartTitle: string, sets: Set[], chartConfig: ChartConfig, workout: Workout): ChartElement {
    let variableToShow: number = 0
    chartConfig.exercise.label = "kg"
    sets.forEach(set => {
        switch (chartType) {
            case ExerciseChartType.MAX_WEIGHT: {
                chartTitle = `Max weight`
                if (set.weight > variableToShow) {
                    variableToShow = set.weight
                }
                break
            }
            case ExerciseChartType.SET_VOLUME: {
                chartTitle = "Volume"
                let setVolume = set.weight * set.reps
                if (setVolume > variableToShow) {
                    variableToShow = setVolume
                }
                break
            }
            case ExerciseChartType.SESSION_VOLUME: {
                chartTitle = "Session Volume"
                let setVolume = set.weight * set.reps;
                variableToShow += setVolume
                break
            }
            case ExerciseChartType.TOTAL_REPS: {
                chartTitle = "Total reps"
                variableToShow += set.reps
                chartConfig.exercise.label = "reps"
                break
            }
        }
    })
    return {
        workout: dateParser(workout.times[0]),
        exercise: variableToShow
    }
}

function dateParser(notParsedDate: string): string {
    let elements: string[] = notParsedDate.split(" ")
    let parsedDate: string = ""
    let day: string = elements[0];
    let month: string = elements[1];
    let year: string = elements[2].substring(2, 4);
    let monthAsNumber: number = 0
    let separator = "/"
    switch (month) {
        case "jan": {
            monthAsNumber = 1;
            break;
        }
        case "feb": {
            monthAsNumber = 2;
            break;
        }
        case "mar": {
            monthAsNumber = 3;
            break;
        }
        case "apr": {
            monthAsNumber = 4;
            break;
        }
        case "may": {
            monthAsNumber = 5;
            break;
        }
        case "jun": {
            monthAsNumber = 6;
            break;
        }
        case "jul": {
            monthAsNumber = 7;
            break;
        }
        case "aug": {
            monthAsNumber = 8;
            break;
        }
        case "sep": {
            monthAsNumber = 9;
            break;
        }
        case "oct": {
            monthAsNumber = 10;
            break;
        }
        case "nov": {
            monthAsNumber = 11;
            break;
        }
        case "dec": {
            monthAsNumber = 12;
            break;
        }
    }
    let parsedData = parsedDate.concat(day, separator, String(monthAsNumber), separator, year);
    console.log(parsedData);
    return parsedData;
}
